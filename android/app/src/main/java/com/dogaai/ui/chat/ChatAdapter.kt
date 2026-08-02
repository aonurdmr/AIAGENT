package com.dogaai.ui.chat

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.dogaai.databinding.ItemChatUserBinding
import com.dogaai.databinding.ItemChatAssistantBinding

class ChatAdapter : ListAdapter<ChatMessage, RecyclerView.ViewHolder>(DIFF) {

    companion object {
        private val DIFF = object : DiffUtil.ItemCallback<ChatMessage>() {
            override fun areItemsTheSame(a: ChatMessage, b: ChatMessage) =
                a.content == b.content && a.role == b.role
            override fun areContentsTheSame(a: ChatMessage, b: ChatMessage) = a == b
        }
        private const val TYPE_USER = 0
        private const val TYPE_ASSISTANT = 1
    }

    override fun getItemViewType(pos: Int) =
        if (getItem(pos).role == "user") TYPE_USER else TYPE_ASSISTANT

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return if (viewType == TYPE_USER) {
            UserHolder(ItemChatUserBinding.inflate(inflater, parent, false))
        } else {
            AssistantHolder(ItemChatAssistantBinding.inflate(inflater, parent, false))
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, pos: Int) {
        val item = getItem(pos)
        when (holder) {
            is UserHolder -> holder.bind(item)
            is AssistantHolder -> holder.bind(item)
        }
    }

    class UserHolder(private val b: ItemChatUserBinding) : RecyclerView.ViewHolder(b.root) {
        fun bind(msg: ChatMessage) { b.tvMessage.text = msg.content }
    }

    class AssistantHolder(private val b: ItemChatAssistantBinding) : RecyclerView.ViewHolder(b.root) {
        fun bind(msg: ChatMessage) { b.tvMessage.text = msg.content }
    }
}
