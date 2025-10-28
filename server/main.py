from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from server import models
from server.database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins for local testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Existing User schemas
class UserCreate(BaseModel):
    name: str
    email: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

# New schemas for Tasks
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    user_id: int

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    due_date: Optional[datetime]
    completed: bool
    user_id: int

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    completed: Optional[bool] = None

# New schemas for School Activities
class SchoolActivityCreate(BaseModel):
    subject: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    user_id: int

class SchoolActivityResponse(BaseModel):
    id: int
    subject: str
    description: Optional[str]
    deadline: Optional[datetime]
    user_id: int

    class Config:
        from_attributes = True

class SchoolActivityUpdate(BaseModel):
    subject: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None

# New schemas for Health Entries
class HealthEntryCreate(BaseModel):
    activity: str
    description: Optional[str] = None
    time: Optional[str] = None
    date: Optional[datetime] = None
    user_id: int

class HealthEntryResponse(BaseModel):
    id: int
    activity: str
    description: Optional[str]
    time: Optional[str]
    date: datetime
    user_id: int

    class Config:
        from_attributes = True

class HealthEntryUpdate(BaseModel):
    activity: Optional[str] = None
    description: Optional[str] = None
    time: Optional[str] = None
    date: Optional[datetime] = None

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = models.User(name=user.name, email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/users/", response_model=list[UserResponse])
def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

# Task endpoints
@app.get("/tasks/", response_model=list[TaskResponse])
def read_tasks(user_id: int, db: Session = Depends(get_db)):
    tasks = db.query(models.Task).filter(models.Task.user_id == user_id).all()
    return tasks

@app.post("/tasks/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    # Verify user exists
    user = db.query(models.User).filter(models.User.id == task.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_task = models.Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        user_id=task.user_id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted"}

# School Activity endpoints
@app.get("/school/", response_model=list[SchoolActivityResponse])
def read_school_activities(user_id: int, db: Session = Depends(get_db)):
    activities = db.query(models.SchoolActivity).filter(models.SchoolActivity.user_id == user_id).all()
    return activities

@app.post("/school/", response_model=SchoolActivityResponse)
def create_school_activity(activity: SchoolActivityCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == activity.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_activity = models.SchoolActivity(
        subject=activity.subject,
        description=activity.description,
        deadline=activity.deadline,
        user_id=activity.user_id
    )
    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)
    return new_activity

@app.put("/school/{activity_id}", response_model=SchoolActivityResponse)
def update_school_activity(activity_id: int, activity_update: SchoolActivityUpdate, db: Session = Depends(get_db)):
    db_activity = db.query(models.SchoolActivity).filter(models.SchoolActivity.id == activity_id).first()
    if not db_activity:
        raise HTTPException(status_code=404, detail="School activity not found")
    update_data = activity_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_activity, field, value)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@app.delete("/school/{activity_id}")
def delete_school_activity(activity_id: int, db: Session = Depends(get_db)):
    db_activity = db.query(models.SchoolActivity).filter(models.SchoolActivity.id == activity_id).first()
    if not db_activity:
        raise HTTPException(status_code=404, detail="School activity not found")
    db.delete(db_activity)
    db.commit()
    return {"message": "School activity deleted"}

# Health Entry endpoints
@app.get("/health/", response_model=list[HealthEntryResponse])
def read_health_entries(user_id: int, db: Session = Depends(get_db)):
    entries = db.query(models.HealthEntry).filter(models.HealthEntry.user_id == user_id).all()
    return entries

@app.post("/health/", response_model=HealthEntryResponse)
def create_health_entry(entry: HealthEntryCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == entry.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_entry = models.HealthEntry(
        activity=entry.activity,
        description=entry.description,
        time=entry.time,
        date=entry.date or datetime.utcnow(),
        user_id=entry.user_id
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

@app.put("/health/{entry_id}", response_model=HealthEntryResponse)
def update_health_entry(entry_id: int, entry_update: HealthEntryUpdate, db: Session = Depends(get_db)):
    db_entry = db.query(models.HealthEntry).filter(models.HealthEntry.id == entry_id).first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Health entry not found")
    update_data = entry_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_entry, field, value)
    db.commit()
    db.refresh(db_entry)
    return db_entry

@app.delete("/health/{entry_id}")
def delete_health_entry(entry_id: int, db: Session = Depends(get_db)):
    db_entry = db.query(models.HealthEntry).filter(models.HealthEntry.id == entry_id).first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Health entry not found")
    db.delete(db_entry)
    db.commit()
    return {"message": "Health entry deleted"}
