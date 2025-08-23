import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
import datetime
from sqlalchemy import Boolean
from pydantic import BaseModel, EmailStr
from app.config.db import Base


# -------------------- Pydantic Schemas --------------------

class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str | None = None
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: uuid.UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class ResetPasswordRequest(BaseModel):
    username: str
    new_password: str


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)


    def set_hashed_password(self, hashed_password: str):
        self.hashed_password = hashed_password
        
    def get_id(self):
        return str(self.id)

    def is_authenticated(self):
        return True

    def is_active_user(self):
        return self.is_active
    
    def repr(self):
        return f'<User {self.username}>'


