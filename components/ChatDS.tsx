// File: components/ChatDS.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ChatDS({ userId, otherUserId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at');

    if (!error) setMessages(data);
  }

  async function sendMessage() {
    if (!input.trim()) return;
    await supabase.from('messages').insert({
      sender_id: userId,
      receiver_id: otherUserId,
      content: input
    });
    setInput('');
  }

  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Chat con il DS</h2>
      <div className="h-64 overflow-y-scroll bg-gray-100 p-2 mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-1 p-2 rounded text-sm max-w-[80%] ${msg.sender_id === userId ? 'bg-blue-200 ml-auto' : 'bg-white'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={sendMessage}>Invia</button>
      </div>
    </div>
  );
}
