package com.dogaai.data.api

import com.dogaai.data.model.*
import okhttp3.MultipartBody
import retrofit2.Response
import retrofit2.http.*

interface ApiService {

    // ── Auth ──────────────────────────────────────────
    @POST("api/auth/register")
    suspend fun register(@Body body: RegisterRequest): Response<AuthResponse>

    @POST("api/auth/login")
    suspend fun login(@Body body: LoginRequest): Response<AuthResponse>

    @GET("api/auth/me")
    suspend fun getMe(): Response<UserPublic>

    @PUT("api/auth/profile")
    suspend fun updateProfile(@Body body: ProfileUpdateRequest): Response<UserPublic>

    // ── Species identification ─────────────────────────
    @Multipart
    @POST("api/identify")
    suspend fun identify(
        @Part image: MultipartBody.Part,
        @Part("activity") activity: String = "fishing"
    ): Response<IdentifyResponse>

    // ── Weather ───────────────────────────────────────
    @POST("api/weather")
    suspend fun getWeather(@Body body: WeatherRequest): Response<WeatherResponse>

    // ── Spots ─────────────────────────────────────────
    @GET("api/spots")
    suspend fun getSpots(
        @Query("type") type: String? = null,
        @Query("lat") lat: Double? = null,
        @Query("lng") lng: Double? = null,
        @Query("radius") radius: Int = 50
    ): Response<List<Spot>>

    @POST("api/spots")
    suspend fun createSpot(@Body body: SpotCreateRequest): Response<Spot>

    // ── Activities ────────────────────────────────────
    @GET("api/activities")
    suspend fun getActivities(@Query("limit") limit: Int = 20): Response<List<Activity>>

    @POST("api/activities")
    suspend fun logActivity(@Body body: ActivityCreateRequest): Response<Activity>

    // ── Community posts ───────────────────────────────
    @GET("api/posts")
    suspend fun getPosts(
        @Query("limit") limit: Int = 20,
        @Query("category") category: String? = null
    ): Response<List<Post>>

    @POST("api/posts")
    suspend fun createPost(@Body body: PostCreateRequest): Response<Post>

    @POST("api/posts/{id}/like")
    suspend fun likePost(@Path("id") id: String): Response<LikeResponse>

    @POST("api/posts/{id}/comment")
    suspend fun commentPost(
        @Path("id") id: String,
        @Body body: CommentRequest
    ): Response<Post>

    // ── AI Chat ───────────────────────────────────────
    @POST("api/chat")
    suspend fun chat(@Body body: ChatRequest): Response<ChatResponse>

    // ── Species encyclopedia ──────────────────────────
    @GET("api/species")
    suspend fun getSpecies(
        @Query("category") category: String? = null,
        @Query("search") search: String? = null
    ): Response<List<Species>>

    // ── Stats ─────────────────────────────────────────
    @GET("api/stats")
    suspend fun getStats(): Response<StatsResponse>
}
