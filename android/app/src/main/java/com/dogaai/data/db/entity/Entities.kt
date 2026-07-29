package com.dogaai.data.db.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "activities")
data class ActivityEntity(
    @PrimaryKey val id: String,
    val type: String,
    val species: String?,
    val location: String?,
    val count: Int,
    val weight: Double?,
    val notes: String,
    val weatherConditions: String?,
    val createdAt: String
)

@Entity(tableName = "spots")
data class SpotEntity(
    @PrimaryKey val id: String,
    val name: String,
    val description: String,
    val type: String,
    val lat: Double,
    val lng: Double,
    val rating: Double,
    val visitCount: Int,
    val tagsJson: String,   // JSON array stored as string
    val createdAt: String
)
