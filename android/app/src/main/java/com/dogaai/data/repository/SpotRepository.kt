package com.dogaai.data.repository

import com.dogaai.data.api.ApiService
import com.dogaai.data.db.SpotDao
import com.dogaai.data.db.entity.SpotEntity
import com.dogaai.data.model.Spot
import com.dogaai.data.model.SpotCreateRequest
import com.google.gson.Gson
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SpotRepository @Inject constructor(
    private val api: ApiService,
    private val spotDao: SpotDao,
    private val gson: Gson
) {
    fun observeSpots(type: String? = null): Flow<List<SpotEntity>> =
        if (type != null) spotDao.observeByType(type) else spotDao.observeAll()

    suspend fun refreshSpots(type: String? = null): Result<List<Spot>> {
        return try {
            val response = api.getSpots(type = type)
            if (response.isSuccessful) {
                val spots = response.body()!!
                spotDao.deleteAll()
                spotDao.insertAll(spots.map { it.toEntity() })
                Result.Success(spots)
            } else {
                Result.Error("Noktalar yüklenemedi")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Bağlantı hatası")
        }
    }

    suspend fun createSpot(request: SpotCreateRequest): Result<Spot> {
        return try {
            val response = api.createSpot(request)
            if (response.isSuccessful) {
                val spot = response.body()!!
                spotDao.insertAll(listOf(spot.toEntity()))
                Result.Success(spot)
            } else {
                Result.Error("Nokta oluşturulamadı")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Bağlantı hatası")
        }
    }

    private fun Spot.toEntity() = SpotEntity(
        id = id, name = name, description = description, type = type,
        lat = lat, lng = lng, rating = rating, visitCount = visitCount,
        tagsJson = gson.toJson(tags), createdAt = createdAt
    )
}
