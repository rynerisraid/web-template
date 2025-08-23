from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.config.db import get_async_db
from app.services.tasks import PipelineService
from app.models.tasks import (
    DataPipelineCreate, 
    DataPipelineRead, 
)
import uuid

from app.services.auth import get_current_user

router = APIRouter()
# DataPipeline endpoints
@router.post("/pipelines/", response_model=DataPipelineRead, status_code=status.HTTP_201_CREATED)
async def create_data_pipeline(data_pipeline: DataPipelineCreate, db: AsyncSession = Depends(get_async_db)):
    """
    Create a new data pipeline
    """
    service = PipelineService(db)
    return await service.create_data_pipeline(data_pipeline)

@router.get("/pipelines/", response_model=List[DataPipelineRead])
async def read_data_pipelines(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_async_db)):
    """
    Get list of data pipelines with pagination
    """
    service = PipelineService(db)
    return await service.get_data_pipelines(skip, limit)

@router.get("/pipelines/{pipeline_id}", response_model=DataPipelineRead)
async def read_data_pipeline(pipeline_id: uuid.UUID, db: AsyncSession = Depends(get_async_db)):
    """
    Get a specific data pipeline by ID
    """
    service = PipelineService(db)
    db_data_pipeline = await service.get_data_pipeline(pipeline_id)
    if db_data_pipeline is None:
        raise HTTPException(status_code=404, detail="Data pipeline not found")
    return db_data_pipeline

@router.put("/pipelines/{pipeline_id}", response_model=DataPipelineRead)
async def update_data_pipeline(pipeline_id: uuid.UUID, data_pipeline_update: dict, db: AsyncSession = Depends(get_async_db)):
    """
    Update a data pipeline
    """
    service = PipelineService(db)
    db_data_pipeline = await service.update_data_pipeline(pipeline_id, data_pipeline_update)
    if db_data_pipeline is None:
        raise HTTPException(status_code=404, detail="Data pipeline not found")
    return db_data_pipeline

@router.delete("/pipelines/{pipeline_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_data_pipeline(pipeline_id: uuid.UUID, db: AsyncSession = Depends(get_async_db)):
    """
    Delete a data pipeline
    """
    service = PipelineService(db)
    success = await service.delete_data_pipeline(pipeline_id)
    if not success:
        raise HTTPException(status_code=404, detail="Data pipeline not found")
    return await service.delete_data_pipeline(pipeline_id)


@router.get("/pipelines/source/{source_id}", response_model=List[DataPipelineRead])
async def read_data_pipelines_by_source(source_id: uuid.UUID, db: AsyncSession = Depends(get_async_db)):
    """
    Get data pipelines by source ID
    """
    service = PipelineService(db)
    return await service.get_data_pipelines_by_source(source_id)