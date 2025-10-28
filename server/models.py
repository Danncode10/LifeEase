from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)

    # Relationships
    tasks = relationship("Task", back_populates="user")
    school_activities = relationship("SchoolActivity", back_populates="user")
    health_entries = relationship("HealthEntry", back_populates="user")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=True)
    completed = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="tasks")

class SchoolActivity(Base):
    __tablename__ = "school_activities"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, nullable=False)
    description = Column(String, nullable=True)
    deadline = Column(DateTime, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="school_activities")

class HealthEntry(Base):
    __tablename__ = "health_entries"

    id = Column(Integer, primary_key=True, index=True)
    activity = Column(String, nullable=False)
    description = Column(String, nullable=True)
    time = Column(String, nullable=True)  # HH:MM format
    date = Column(DateTime, default=datetime.utcnow)  # Optional date for scheduling
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="health_entries")
