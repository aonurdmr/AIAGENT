package com.dogaai.data.model

import com.google.gson.annotations.SerializedName

// ── Auth ──────────────────────────────────────────────
data class RegisterRequest(
    val username: String,
    val email: String,
    val password: String,
    @SerializedName("full_name") val fullName: String = ""
)

data class LoginRequest(val email: String, val password: String)

data class AuthResponse(val token: String, val user: UserPublic)

data class UserPublic(
    val id: String,
    val username: String,
    val email: String,
    @SerializedName("full_name") val fullName: String,
    val bio: String,
    @SerializedName("avatar_color") val avatarColor: String,
    @SerializedName("total_catches") val totalCatches: Int,
    @SerializedName("total_activities") val totalActivities: Int,
    @SerializedName("created_at") val createdAt: String
)

data class ProfileUpdateRequest(
    @SerializedName("full_name") val fullName: String? = null,
    val bio: String? = null
)

// ── Identify ──────────────────────────────────────────
data class IdentifyResponse(
    val species: String,
    @SerializedName("scientific_name") val scientificName: String,
    val confidence: Double,
    val description: String,
    val habitat: String,
    val season: String,
    val tips: List<String>,
    val regulations: String,
    @SerializedName("size_range") val sizeRange: String,
    @SerializedName("weight_range") val weightRange: String,
    @SerializedName("is_protected") val isProtected: Boolean
)

// ── Weather ───────────────────────────────────────────
data class WeatherRequest(val lat: Double, val lng: Double, val activity: String = "fishing")

data class WeatherResponse(
    val temperature: Double,
    val conditions: String,
    @SerializedName("wind_speed") val windSpeed: Double,
    @SerializedName("humidity") val humidity: Int,
    @SerializedName("moon_phase") val moonPhase: String,
    @SerializedName("activity_score") val activityScore: Int,
    val tips: List<String>,
    val warning: String?
)

// ── Spots ─────────────────────────────────────────────
data class Spot(
    val id: String,
    val name: String,
    val description: String,
    val type: String,
    val lat: Double,
    val lng: Double,
    val rating: Double,
    @SerializedName("visit_count") val visitCount: Int,
    val tags: List<String>,
    @SerializedName("created_by") val createdBy: String?,
    @SerializedName("created_at") val createdAt: String
)

data class SpotCreateRequest(
    val name: String,
    val description: String,
    val type: String,
    val lat: Double,
    val lng: Double,
    val tags: List<String> = emptyList()
)

// ── Activity ──────────────────────────────────────────
data class Activity(
    val id: String,
    val type: String,
    val species: String?,
    val location: String?,
    val count: Int,
    val weight: Double?,
    val notes: String,
    @SerializedName("weather_conditions") val weatherConditions: String?,
    @SerializedName("user_id") val userId: String?,
    val username: String?,
    @SerializedName("created_at") val createdAt: String
)

data class ActivityCreateRequest(
    val type: String,
    val species: String?,
    val location: String?,
    val count: Int = 1,
    val weight: Double? = null,
    val notes: String = "",
    @SerializedName("weather_conditions") val weatherConditions: String? = null
)

// ── Community ─────────────────────────────────────────
data class Post(
    val id: String,
    val title: String,
    val content: String,
    val category: String,
    val location: String?,
    @SerializedName("user_id") val userId: String?,
    val username: String,
    @SerializedName("avatar_color") val avatarColor: String,
    val likes: Int,
    val comments: List<Comment>,
    @SerializedName("created_at") val createdAt: String
)

data class Comment(
    val id: String,
    val username: String,
    val content: String,
    @SerializedName("created_at") val createdAt: String
)

data class PostCreateRequest(
    val title: String,
    val content: String,
    val category: String = "genel",
    val location: String? = null
)

data class LikeResponse(val likes: Int)

data class CommentRequest(val content: String)

// ── Chat ──────────────────────────────────────────────
data class ChatRequest(
    val message: String,
    @SerializedName("session_id") val sessionId: String? = null,
    val context: String = "fishing"
)

data class ChatResponse(
    val response: String,
    @SerializedName("session_id") val sessionId: String
)

// ── Species ───────────────────────────────────────────
data class Species(
    val id: String,
    val name: String,
    @SerializedName("scientific_name") val scientificName: String,
    val category: String,
    val description: String,
    val habitat: String,
    @SerializedName("size_range") val sizeRange: String,
    val season: String,
    @SerializedName("is_protected") val isProtected: Boolean,
    val tips: List<String>
)

// ── Stats ─────────────────────────────────────────────
data class StatsResponse(
    @SerializedName("total_spots") val totalSpots: Int,
    @SerializedName("species_identified") val speciesIdentified: Int,
    @SerializedName("active_users") val activeUsers: Int,
    @SerializedName("total_activities") val totalActivities: Int
)
