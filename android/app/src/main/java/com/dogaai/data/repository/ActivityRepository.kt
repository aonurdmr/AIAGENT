package com.dogaai.data.repository

import com.dogaai.data.api.ApiService
import com.dogaai.data.db.ActivityDao
import com.dogaai.data.db.entity.ActivityEntity
import com.dogaai.data.model.Activity
import com.dogaai.data.model.ActivityCreateRequest
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ActivityRepository @Inject constructor(
    private val api: ApiService,
    private val activityDao: ActivityDao
) {
    fun observeActivities(): Flow<List<ActivityEntity>> = activityDao.observeAll()

    suspend fun refreshActivities(): Result<List<Activity>> {
        return try {
            val response = api.getActivities()
            if (response.isSuccessful) {
                val activities = response.body()!!
                activityDao.deleteAll()
                activityDao.insertAll(activities.map { it.toEntity() })
                Result.Success(activities)
            } else {
                Result.Error("Aktiviteler yüklenemedi")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Bağlantı hatası")
        }
    }

    suspend fun logActivity(request: ActivityCreateRequest): Result<Activity> {
        return try {
            val response = api.logActivity(request)
            if (response.isSuccessful) {
                val activity = response.body()!!
                activityDao.insert(activity.toEntity())
                Result.Success(activity)
            } else {
                Result.Error("Aktivite kaydedilemedi")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Bağlantı hatası")
        }
    }

    private fun Activity.toEntity() = ActivityEntity(
        id = id, type = type, species = species, location = location,
        count = count, weight = weight, notes = notes,
        weatherConditions = weatherConditions, createdAt = createdAt
    )
}
