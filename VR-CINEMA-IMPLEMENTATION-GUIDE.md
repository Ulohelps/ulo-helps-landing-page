# 🎬 VR Cinema Platform - Complete Implementation Guide

**Goal:** Build a web-based VR cinema platform where users can watch movies together in virtual rooms with synchronized playback.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [User Flow Diagrams](#user-flow-diagrams)
4. [Implementation Phases](#implementation-phases)
5. [Deployment Guide](#deployment-guide)
6. [Performance Optimization](#performance-optimization)
7. [Resources & Next Steps](#resources--next-steps)

---

## Project Overview

### ✨ Key Features

- WebXR-compatible (Quest, desktop, mobile)
- Social lobby with avatars
- Private 4-person watch groups
- Synchronized video playback
- Text chat (voice in v2)
- Ticket sales via Paystack/Stripe
- Admin moderation dashboard

### 🛠️ Tech Stack

- **Frontend:** Next.js 14 + React
- **VR:** A-Frame + Three.js
- **Real-time:** Socket.IO
- **Database:** Supabase (PostgreSQL)
- **Video:** Cloudflare Stream
- **Payments:** Paystack + Stripe
- **Hosting:** Vercel + Render

### 📅 Timeline Estimate

| Phase | Duration |
|-------|----------|
| MVP Development | 5-6 weeks |
| Testing & Refinement | 1-2 weeks |
| **Total to Launch** | **6-8 weeks** |

### 💰 Estimated Monthly Costs (MVP)

| Service | Cost |
|---------|------|
| Supabase (Pro) | $25 |
| Vercel (Hobby/Pro) | $0-20 |
| Render/Railway (Server) | $7-25 |
| Cloudflare Stream | $1/1000 min |
| Domain + SSL | $1-2 |
| **Total** | **~$35-75/mo** |

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Web    │  │    VR    │  │  Mobile  │  │ Desktop  │   │
│  │ Browser  │  │ Headset  │  │  Device  │  │   App    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND (Next.js + A-Frame)                    │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐           │
│  │   UI   │  │   VR   │  │ State  │  │ Socket │           │
│  │  Comp  │  │ Scene  │  │Manager │  │ Client │           │
│  └────────┘  └────────┘  └────────┘  └────────┘           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────┐  ┌──────────────────────────┐
│    BACKEND SERVICES          │  │      DATA LAYER          │
│  ┌──────────────────────┐   │  │  ┌──────────────────┐   │
│  │   API Server         │   │  │  │  Supabase DB     │   │
│  │   (Next.js Routes)   │   │  │  │  (PostgreSQL)    │   │
│  ├──────────────────────┤   │  │  ├──────────────────┤   │
│  │   Socket.IO Server   │   │  │  │  Redis Cache     │   │
│  ├──────────────────────┤   │  │  ├──────────────────┤   │
│  │   Auth Service       │   │  │  │  File Storage    │   │
│  ├──────────────────────┤   │  │  ├──────────────────┤   │
│  │   Payment Service    │   │  │  │  Session Store   │   │
│  └──────────────────────┘   │  │  └──────────────────┘   │
└──────────────────────────────┘  └──────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Cloudflare│  │ Paystack │  │  Stripe  │  │   CDN    │   │
│  │  Stream  │  │   API    │  │   API    │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Patterns

- **Real-time Events:** Client → Socket.IO → Server Logic → Broadcast to Room
- **Persistent Data:** Client → API → Supabase → Response
- **Video Streaming:** Client → CDN → HLS Chunks → Video Element
- **Payments:** Client → Paystack → Webhook → Verify → Grant Access

---

## User Flow Diagrams

### 1. User Registration & Authentication Flow

```
    ┌─────┐
    │START│
    └──┬──┘
       │
       ▼
┌─────────────┐
│Landing Page │
└──────┬──────┘
       │
       ▼
   ┌────────┐
   │New User?│
   └───┬─┬──┘
    Yes│ │No
   ┌───▼─▼────┐
   │          │
┌──▼──┐   ┌──▼──┐
│Signup│   │Login│
└──┬───┘   └──┬──┘
   │          │
   └────┬─────┘
        │
        ▼
┌───────────────┐
│Supabase Auth  │
│Verify & Create│
└───────┬───────┘
        │
        ▼
┌───────────────┐
│Create Profile │
│  in Database  │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  Lobby Page   │
│(Authenticated)│
└───────────────┘
```

### 2. Ticket Purchase Flow

```
┌──────────┐    ┌──────────┐    ┌────────────┐
│  Browse  │───▶│  Select  │───▶│  Already   │
│  Events  │    │  Event   │    │ Purchased? │
└──────────┘    └──────────┘    └─────┬──┬───┘
                                  Yes │  │ No
                          ┌───────────┘  └──────┐
                          │                      │
                     ┌────▼────┐        ┌───────▼────────┐
                     │   Go    │        │  Payment Form  │
                     │   to    │        │(Paystack/Stripe)│
                     │  Lobby  │        └────────┬────────┘
                     └─────────┘                 │
                                                 ▼
                                        ┌────────────────┐
                                        │    Process     │
                                        │    Payment     │
                                        └────────┬───────┘
                                                 │
                                            ┌────▼────┐
                                            │Success? │
                                            └─┬────┬──┘
                                         Yes │    │ No
                                    ┌────────┘    └──────┐
                                    │                     │
                            ┌───────▼───────┐    ┌───────▼────┐
                            │   Save to DB  │    │ Show Error │
                            │ (Transaction) │    └────────────┘
                            └───────┬───────┘
                                    │
                                    ▼
                            ┌───────────────┐
                            │  Go to Lobby  │
                            └───────────────┘
```

### 3. Group Formation & Movie Playback Flow

```
┌──────────┐    ┌──────────┐    ┌────────────┐
│  Enter   │───▶│See Other │───▶│Create or   │
│  Lobby   │    │  Users   │    │Join Group? │
└──────────┘    └──────────┘    └─────┬──┬───┘
                                Create│  │Join
                            ┌──────────┘  └─────────┐
                            │                        │
                      ┌─────▼──────┐        ┌───────▼────────┐
                      │   Create   │        │     Accept     │
                      │Group (Max 4)│        │   Invitation   │
                      └──────┬──────┘        └────────┬───────┘
                             │                        │
                             ▼                        │
                      ┌─────────────┐                 │
                      │   Invite    │                 │
                      │   Friends   │                 │
                      └──────┬──────┘                 │
                             └───────────┬────────────┘
                                         │
                                         ▼
                                ┌────────────────┐
                                │  Group Ready   │
                                │  (2-4 members) │
                                └────────┬───────┘
                                         │
                                         ▼
                                ┌────────────────┐
                                │  Event Starts  │
                                └────────┬───────┘
                                         │
                                         ▼
                                ┌────────────────┐
                                │  Teleport to   │
                                │    Theater     │
                                └────────┬───────┘
                                         │
                                         ▼
                                ┌────────────────┐
                                │   Load Video   │
                                │  (HLS Stream)  │
                                └────────┬───────┘
                                         │
                     ┌───────────────────┼────────────────┐
                     │                   │                │
                     ▼                   ▼                ▼
            ┌────────────────┐  ┌────────────┐  ┌─────────────┐
            │  Server Syncs  │  │   Watch    │  │ Group Chat  │
            │   Playback     │  │  Together! │  │(Text/Emotes)│
            └────────────────┘  └────────────┘  └─────────────┘
```

---

## Implementation Phases

## Phase 1: Foundation Setup (Week 1)
**Duration:** 5-7 days

### Step 1: Development Environment Setup

**Tasks:**
- [ ] Install Node.js 18+ and npm/yarn
- [ ] Install Git and configure repository
- [ ] Set up VS Code with extensions (ESLint, Prettier, Tailwind)
- [ ] Install Meta Quest Developer Hub for testing
- [ ] Create project repository

**Commands:**
```bash
# Initialize Next.js project
npx create-next-app@latest vr-cinema --typescript --tailwind --app
cd vr-cinema

# Install core dependencies
npm install socket.io-client aframe aframe-extras
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install stripe zustand date-fns

# Install dev dependencies
npm install -D @types/aframe @types/node
```

### Step 2: Supabase Project Setup

**Tasks:**
- [ ] Create Supabase account at supabase.com
- [ ] Create new project (EU West region for Nigeria)
- [ ] Copy project URL and anon key to .env.local
- [ ] Enable Email authentication
- [ ] Configure email templates

**Environment Variables:**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### Step 3: Database Schema Creation

**Tasks:**
- [ ] Go to Supabase SQL Editor
- [ ] Run schema creation script
- [ ] Enable Row Level Security (RLS)
- [ ] Create storage bucket for posters

**SQL Schema:**
```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  banned_until TIMESTAMPTZ,
  banned_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Movies table
CREATE TABLE public.movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  poster_url TEXT,
  duration_minutes INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events (movie showtimes)
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID REFERENCES public.movies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_at TIMESTAMPTZ NOT NULL,
  ticket_price DECIMAL(10,2) DEFAULT 0,
  max_capacity INTEGER DEFAULT 100,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Groups (watch parties)
CREATE TABLE public.groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  host_user_id UUID REFERENCES public.profiles(id),
  name TEXT,
  max_size INTEGER DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group members
CREATE TABLE public.group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Transactions
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  event_id UUID REFERENCES public.events(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  provider TEXT NOT NULL,
  provider_reference TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_events_start_at ON public.events(start_at);
CREATE INDEX idx_group_members_group_id ON public.group_members(group_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (examples)
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);
```

### Step 4: Socket.IO Server Setup

**Tasks:**
- [ ] Create server/ directory
- [ ] Initialize Node.js project in server/
- [ ] Install Socket.IO and Express
- [ ] Create server/index.js with basic setup

**Server Code:**
```javascript
// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// In-memory storage (replace with Redis in production)
const activeSessions = new Map(); // sessionId -> {users, playbackState}
const userSessions = new Map(); // userId -> sessionId

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join_lobby', ({ userId, username }) => {
    socket.userId = userId;
    socket.username = username;
    socket.join('lobby');
    
    io.to('lobby').emit('user_joined', {
      userId,
      username,
      socketId: socket.id
    });
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      io.to('lobby').emit('user_left', {
        userId: socket.userId,
        socketId: socket.id
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
```

---

## Phase 2: Authentication & UI (Week 1-2)
**Duration:** 5-7 days

### Step 1: Authentication Implementation

**Tasks:**
- [ ] Create lib/supabase.ts client configuration
- [ ] Build login page (app/auth/login/page.tsx)
- [ ] Build signup page (app/auth/signup/page.tsx)
- [ ] Create middleware for protected routes

**Supabase Client:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### Step 2: Main Layout & Navigation

**Tasks:**
- [ ] Create responsive navigation header
- [ ] Add user dropdown menu
- [ ] Implement dark mode theme
- [ ] Create footer component

### Step 3: Event Listing & Payments

**Tasks:**
- [ ] Create events listing page
- [ ] Build event detail modal
- [ ] Integrate Paystack payment
- [ ] Create payment verification API route

**Paystack Integration:**
```typescript
// components/PaystackButton.tsx
'use client';

export function PaystackButton({ amount, email, eventId, onSuccess }) {
  const handlePayment = () => {
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100, // Convert to kobo
      currency: 'NGN',
      ref: `${Date.now()}`,
      onClose: function() {
        alert('Payment window closed');
      },
      callback: function(response) {
        // Verify payment on backend
        fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            reference: response.reference, 
            eventId 
          })
        }).then(() => onSuccess());
      }
    });
    handler.openIframe();
  };

  return (
    <button onClick={handlePayment} className="bg-green-600 px-6 py-2 rounded">
      Buy Ticket - ₦{amount}
    </button>
  );
}
```

---

## Phase 3: VR Lobby & Avatar System (Week 2-3)
**Duration:** 7-10 days

### Step 1: A-Frame Scene Setup

**Tasks:**
- [ ] Create VR lobby component
- [ ] Add skybox and environment
- [ ] Implement camera controls (desktop & VR)
- [ ] Add teleport locomotion for VR

**A-Frame Scene:**
```jsx
// components/VRLobby.tsx
'use client';
import { useEffect } from 'react';

export default function VRLobby() {
  useEffect(() => {
    // Ensure A-Frame is loaded
    if (typeof window !== 'undefined') {
      require('aframe');
      require('aframe-extras');
    }
  }, []);

  return (
    <a-scene vr-mode-ui="enabled: true">
      {/* Sky */}
      <a-sky color="#1a1a2e"></a-sky>
      
      {/* Ground */}
      <a-plane
        position="0 0 0"
        rotation="-90 0 0"
        width="50"
        height="50"
        color="#16213e"
      ></a-plane>

      {/* Lighting */}
      <a-light type="ambient" color="#445" intensity="0.5"></a-light>
      <a-light type="point" intensity="0.8" position="2 4 4"></a-light>

      {/* Camera rig */}
      <a-entity id="rig" position="0 1.6 5">
        <a-camera look-controls wasd-controls>
          <a-cursor></a-cursor>
        </a-camera>
      </a-entity>

      {/* Movie screen placeholder */}
      <a-box
        position="0 3 -10"
        width="16"
        height="9"
        depth="0.1"
        color="#000"
      ></a-box>
    </a-scene>
  );
}
```

### Step 2: Networked Avatars

**Tasks:**
- [ ] Create simple avatar component (sphere + nameplate)
- [ ] Sync avatar positions via Socket.IO
- [ ] Implement position interpolation
- [ ] Add basic emotes/gestures

**Avatar Synchronization:**
```javascript
// Client-side position updates (throttled)
let lastPositionUpdate = 0;
const positionUpdateInterval = 100; // ms

function updatePosition() {
  const now = Date.now();
  if (now - lastPositionUpdate < positionUpdateInterval) return;
  
  const camera = document.querySelector('#rig');
  const position = camera.getAttribute('position');
  const rotation = camera.getAttribute('rotation');
  
  socket.emit('update_position', {
    userId: currentUser.id,
    position,
    rotation
  });
  
  lastPositionUpdate = now;
}

// Receive other users' positions
socket.on('user_moved', ({ userId, position, rotation }) => {
  const avatar = document.querySelector(`#avatar-${userId}`);
  if (avatar) {
    avatar.setAttribute('position', position);
    avatar.setAttribute('rotation', rotation);
  }
});
```

### Step 3: Text Chat System

**Tasks:**
- [ ] Create chat UI overlay
- [ ] Implement message sending/receiving
- [ ] Add chat history (last 50 messages)
- [ ] Add profanity filter (optional)

---

## Phase 4: Groups & Playback Sync (Week 3-4)
**Duration:** 7-10 days

### Step 1: Group System

**Tasks:**
- [ ] Add "Create Group" button in lobby
- [ ] Implement group invitation system
- [ ] Create group member list UI
- [ ] Add leave/kick functionality

**Group Management (Server-side):**
```javascript
// server/index.js additions
io.on('connection', (socket) => {
  
  socket.on('create_group', async ({ eventId, userId, groupName }) => {
    const groupId = generateId();
    
    const group = {
      id: groupId,
      eventId,
      hostId: userId,
      name: groupName,
      members: [userId],
      maxSize: 4,
      playbackState: {
        positionMs: 0,
        playing: false,
        timestamp: Date.now()
      }
    };
    
    activeSessions.set(groupId, group);
    userSessions.set(userId, groupId);
    
    socket.join(`group:${groupId}`);
    socket.emit('group_created', group);
  });

  socket.on('invite_to_group', ({ groupId, targetUserId }) => {
    const targetSocket = getUserSocket(targetUserId);
    if (targetSocket) {
      io.to(targetSocket).emit('group_invitation', {
        groupId,
        invitedBy: socket.userId
      });
    }
  });

  socket.on('join_group', async ({ groupId, userId }) => {
    const group = activeSessions.get(groupId);
    
    if (!group || group.members.length >= group.maxSize) {
      return socket.emit('error', { message: 'Group full or not found' });
    }
    
    group.members.push(userId);
    userSessions.set(userId, groupId);
    socket.join(`group:${groupId}`);
    
    io.to(`group:${groupId}`).emit('member_joined', {
      groupId,
      userId,
      members: group.members
    });
  });
});
```

### Step 2: Playback Synchronization

**Tasks:**
- [ ] Implement server-authoritative playback state
- [ ] Add play/pause/seek controls
- [ ] Sync video across all group members
- [ ] Handle late joiners

**Server Playback Control:**
```javascript
socket.on('request_play', ({ groupId }) => {
  const group = activeSessions.get(groupId);
  if (!group || socket.userId !== group.hostId) return;
  
  const now = Date.now();
  group.playbackState = {
    ...group.playbackState,
    playing: true,
    timestamp: now
  };
  
  io.to(`group:${groupId}`).emit('playback_play', {
    positionMs: group.playbackState.positionMs,
    timestamp: now
  });
});

socket.on('request_pause', ({ groupId }) => {
  const group = activeSessions.get(groupId);
  if (!group || socket.userId !== group.hostId) return;
  
  const now = Date.now();
  const elapsed = group.playbackState.playing 
    ? now - group.playbackState.timestamp 
    : 0;
  
  group.playbackState = {
    positionMs: group.playbackState.positionMs + elapsed,
    playing: false,
    timestamp: now
  };
  
  io.to(`group:${groupId}`).emit('playback_pause', {
    positionMs: group.playbackState.positionMs
  });
});

socket.on('request_seek', ({ groupId, positionMs }) => {
  const group = activeSessions.get(groupId);
  if (!group || socket.userId !== group.hostId) return;
  
  const now = Date.now();
  group.playbackState = {
    positionMs,
    playing: group.playbackState.playing,
    timestamp: now
  };
  
  io.to(`group:${groupId}`).emit('playback_seek', {
    positionMs,
    playing: group.playbackState.playing,
    timestamp: now
  });
});
```

**Client Playback Sync:**
```javascript
socket.on('playback_play', ({ positionMs, timestamp }) => {
  const video = document.querySelector('#movie-video');
  const now = Date.now();
  const drift = (now - timestamp) / 1000;
  
  video.currentTime = positionMs / 1000 + drift;
  video.play();
});

socket.on('playback_pause', ({ positionMs }) => {
  const video = document.querySelector('#movie-video');
  video.currentTime = positionMs / 1000;
  video.pause();
});

socket.on('playback_seek', ({ positionMs, playing, timestamp }) => {
  const video = document.querySelector('#movie-video');
  video.currentTime = positionMs / 1000;
  
  if (playing) {
    const now = Date.now();
    const drift = (now - timestamp) / 1000;
    video.currentTime += drift;
    video.play();
  } else {
    video.pause();
  }
});
```

### Step 3: Video Player Integration

**Tasks:**
- [ ] Set up Cloudflare Stream account
- [ ] Upload test movie
- [ ] Create video player component with HLS.js
- [ ] Test synchronized playback

**Video Player Component:**
```typescript
// components/VideoPlayer.tsx
'use client';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ videoUrl, onReady }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        onReady(video);
      });
      
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoUrl;
      video.addEventListener('loadedmetadata', () => onReady(video));
    }
  }, [videoUrl, onReady]);

  return (
    <video
      ref={videoRef}
      id="movie-video"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
```

---

## Phase 5: Admin Dashboard (Week 4-5)
**Duration:** 5-7 days

### Step 1: Admin Panel UI

**Tasks:**
- [ ] Create admin-only routes with middleware
- [ ] Build dashboard with stats
- [ ] Add movie management (CRUD)
- [ ] Create event scheduling interface

### Step 2: Moderation Tools

**Tasks:**
- [ ] Implement user ban/unban functionality
- [ ] Add kick from session feature
- [ ] Create moderation logs table and UI
- [ ] Build reported users queue

**Ban User API:**
```typescript
// app/api/admin/ban-user/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { userId, reason, durationHours } = await request.json();
  
  // Check if requester is admin
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (profile?.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  const bannedUntil = new Date();
  bannedUntil.setHours(bannedUntil.getHours() + durationHours);
  
  await supabase
    .from('profiles')
    .update({
      banned_until: bannedUntil.toISOString(),
      banned_reason: reason
    })
    .eq('id', userId);
  
  // Kick from active session via Socket.IO
  // (Requires Socket.IO connection from server)
  
  return Response.json({ success: true });
}
```

### Step 3: Analytics

**Tasks:**
- [ ] Track event attendance
- [ ] Calculate revenue per event
- [ ] Monitor concurrent users
- [ ] Generate admin reports

---

## Phase 6: Testing & Optimization (Week 5-6)
**Duration:** 7-10 days

### Step 1: Cross-Platform Testing

**Tasks:**
- [ ] Test on Meta Quest 2/3 browser
- [ ] Test on desktop (Chrome, Firefox)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Verify playback sync across devices

### Step 2: Performance Optimization

**Tasks:**
- [ ] Implement lazy loading for components
- [ ] Optimize 3D models and textures
- [ ] Add loading states and skeleton screens
- [ ] Configure CDN caching
- [ ] Minimize bundle size

### Step 3: Load Testing

**Tasks:**
- [ ] Use Artillery.io to simulate users
- [ ] Test with 50, 100, 200 concurrent users
- [ ] Monitor server CPU/memory usage
- [ ] Identify and fix bottlenecks

**Artillery Config:**
```yaml
# artillery.yml
config:
  target: "http://localhost:3001"
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Peak load"
  socketio:
    transports: ["websocket"]

scenarios:
  - name: "Join lobby and watch movie"
    engine: socketio
    flow:
      - emit:
          channel: "join_lobby"
          data:
            userId: "test-{{ $randomString() }}"
            username: "User-{{ $randomNumber(1, 1000) }}"
      - think: 2
      - emit:
          channel: "create_group"
          data:
            eventId: "test-event-123"
            groupName: "Test Group"
```

---

## Deployment Guide

## 1. Frontend Deployment (Vercel)

### Prerequisites
- GitHub/GitLab account
- Vercel account (free tier available)
- All environment variables ready

### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Add Environment Variables**
   Add all variables from `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_SOCKET_URL
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY
   SUPABASE_SERVICE_ROLE_KEY
   PAYSTACK_SECRET_KEY
   STRIPE_SECRET_KEY
   ```

5. **Deploy!**
   Click "Deploy" and wait for completion

**💡 Pro Tip:** Enable automatic deployments for preview branches to test features before merging to main.

---

## 2. Backend Server Deployment (Render)

### Using Render

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `server` directory (or root if server is there)

3. **Configure Service**
   ```
   Name: vr-cinema-socket-server
   Environment: Node
   Build Command: npm install
   Start Command: node server/index.js
   Plan: Free (or Starter $7/mo for better performance)
   ```

4. **Add Environment Variables**
   ```
   PORT=3001
   CLIENT_URL=https://your-app.vercel.app
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_KEY=your-service-key
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Copy the service URL once deployed
   - Update `NEXT_PUBLIC_SOCKET_URL` in Vercel to this URL

**⚠️ Note:** Free tier sleeps after 15 minutes of inactivity. Consider Starter plan ($7/mo) for production to avoid cold starts.

---

## 3. Database (Supabase)

Your database is already hosted on Supabase! Just ensure:

- [ ] Database is in EU West region (closest to Nigeria)
- [ ] Backups are enabled (automatic on paid plans)
- [ ] Connection pooling is configured for production
- [ ] RLS policies are properly tested
- [ ] Indexes are created on frequently queried columns

---

## 4. Video Hosting (Cloudflare Stream)

### Setup Steps

1. **Create Cloudflare Account**
   - Go to [cloudflare.com](https://cloudflare.com)
   - Sign up and verify email

2. **Access Stream**
   - Go to Stream in the dashboard
   - Navigate to your Stream section

3. **Upload First Movie**
   - Click "Upload"
   - Select your test movie file
   - Wait for processing

4. **Get HLS URL**
   - Click on the uploaded video
   - Copy the HLS manifest URL
   - Store this URL in your `movies` table

5. **Configure Access Control (Optional)**
   - Enable signed URLs for security
   - Set up tokens with expiry times
   - Implement token generation in your API

**💰 Pricing:** 
- $1 per 1,000 minutes delivered
- $5 per 1,000 minutes stored
- Very affordable for MVP

---

## 5. Custom Domain (Optional)

### To add a custom domain like `vrcinema.ng`:

1. **Purchase Domain**
   - Buy from Namecheap, Cloudflare, or local registrar

2. **Add to Vercel**
   - Go to Vercel project settings
   - Click "Domains"
   - Add your custom domain

3. **Update DNS**
   - Update DNS records as instructed by Vercel
   - Typically: Add A record or CNAME

4. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Usually takes 5-10 minutes

---

## Environment Variables Checklist

### Frontend (Vercel)
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SOCKET_URL=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PAYSTACK_SECRET_KEY=
STRIPE_SECRET_KEY=
```

### Backend (Render)
```bash
PORT=3001
CLIENT_URL=https://your-app.vercel.app
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
REDIS_URL= # optional for MVP
```

---

## Performance Optimization

## Frontend Optimizations

### 1. Code Splitting & Lazy Loading

```typescript
// Lazy load A-Frame only on VR pages
import dynamic from 'next/dynamic';

const VRLobby = dynamic(() => import('@/components/VRLobby'), {
  ssr: false,
  loading: () => <LoadingScreen />
});

// Lazy load heavy components
const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'));
```

### 2. Image Optimization

- Use Next.js Image component for automatic optimization
- Compress posters to WebP format
- Lazy load images below the fold
- Use appropriate image sizes for different devices

```typescript
import Image from 'next/image';

<Image
  src="/poster.jpg"
  alt="Movie poster"
  width={300}
  height={450}
  loading="lazy"
  placeholder="blur"
/>
```

### 3. 3D Asset Optimization

- Keep avatar poly count under 5,000 triangles
- Use texture atlases to reduce draw calls
- Compress textures (use KTX2 format)
- Implement LOD (Level of Detail) for distant objects
- Use instancing for repeated objects

---

## Backend Optimizations

### 1. Socket.IO Performance

```javascript
// Throttle position updates
const throttle = require('lodash/throttle');

const throttledPositionUpdate = throttle((data) => {
  socket.to('lobby').emit('user_moved', data);
}, 100); // Max 10 updates per second

// Use rooms efficiently
socket.join(`event:${eventId}`);
socket.join(`group:${groupId}`);

// Broadcast only to relevant rooms
io.to(`group:${groupId}`).emit('message', data);
```

### 2. Database Query Optimization

- Add indexes on frequently queried columns
- Use `select()` to fetch only needed columns
- Implement pagination for large lists
- Cache frequently accessed data in Redis

```javascript
// Good: Select only needed columns
const { data } = await supabase
  .from('events')
  .select('id, title, start_at, ticket_price')
  .eq('status', 'scheduled')
  .order('start_at', { ascending: true })
  .limit(20);

// Add pagination
const { data, count } = await supabase
  .from('events')
  .select('*', { count: 'exact' })
  .range(0, 19); // First 20 items
```

### 3. Redis Caching Strategy

```javascript
// Cache active sessions
await redis.set(
  `session:${sessionId}`, 
  JSON.stringify(sessionData), 
  'EX', 
  3600 // 1 hour expiry
);

// Cache user profiles
const cachedProfile = await redis.get(`profile:${userId}`);
if (!cachedProfile) {
  // Fetch from DB and cache
  const profile = await fetchProfileFromDB(userId);
  await redis.set(`profile:${userId}`, JSON.stringify(profile), 'EX', 1800);
}

// Cache frequently accessed queries
const cacheKey = `events:upcoming`;
const cached = await redis.get(cacheKey);
if (!cached) {
  const events = await fetchUpcomingEvents();
  await redis.set(cacheKey, JSON.stringify(events), 'EX', 300); // 5 min
}
```

---

## Video Streaming Optimizations

### 1. Adaptive Bitrate Streaming

- Use HLS with multiple quality levels
- Configure quality ladder: 360p, 480p, 720p, 1080p
- Let HLS.js automatically switch based on bandwidth
- Preload only the first segment

```javascript
const hls = new Hls({
  startLevel: 1, // Start at 480p
  maxBufferLength: 30,
  maxMaxBufferLength: 60,
  enableWorker: true,
  lowLatencyMode: false
});
```

### 2. CDN Configuration

- Enable edge caching for video segments
- Use signed URLs to prevent hotlinking
- Configure CORS headers properly
- Set appropriate cache TTLs

---

## Nigeria-Specific Optimizations

### 1. Bandwidth Considerations

- Default to 480p video quality, allow manual upgrade
- Implement "data saver" mode with lower quality
- Reduce 3D asset quality for mobile networks
- Compress all API responses (gzip/brotli)

```javascript
// Detect network quality
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
if (connection) {
  if (connection.effectiveType === '4g') {
    defaultQuality = '720p';
  } else if (connection.effectiveType === '3g') {
    defaultQuality = '480p';
  } else {
    defaultQuality = '360p';
  }
}
```

### 2. Payment Integration Best Practices

- Support bank transfer alongside card payments
- Add USSD payment option via Paystack
- Implement retry logic for failed transactions
- Show clear pricing in Naira (₦)
- Handle network timeouts gracefully

```javascript
// Paystack with bank transfer
const paystackOptions = {
  key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  email: user.email,
  amount: amount * 100,
  currency: 'NGN',
  channels: ['card', 'bank', 'ussd', 'bank_transfer'], // Multiple channels
  metadata: {
    eventId: eventId,
    userId: user.id
  }
};
```

### 3. Reliability Features

- Auto-reconnect Socket.IO on network drops
- Save playback position for resume on disconnect
- Implement offline mode for browsing events
- Show connection quality indicator

```javascript
// Auto-reconnect Socket.IO
const socket = io(socketUrl, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 10
});

socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    // Manual reconnection
    socket.connect();
  }
  // Auto-reconnects for other reasons
});

// Save playback position before disconnect
window.addEventListener('beforeunload', () => {
  localStorage.setItem('lastPosition', video.currentTime);
  localStorage.setItem('lastEvent', eventId);
});
```

---

## Scaling Guidelines

### When to Scale Each Component

| Component | Trigger | Action |
|-----------|---------|--------|
| **Redis** | 100+ concurrent users | Add Redis for session management when in-memory becomes slow |
| **Multiple Socket.IO Servers** | 500+ concurrent users | Use Redis adapter to sync events across instances behind load balancer |
| **DB Connection Pooling** | 1000+ requests/min | Configure Supabase pooler and add read replicas |
| **WebRTC SFU** | Adding voice chat | Move from P2P to SFU (Agora, Daily) when groups exceed 6 |
| **CDN** | Immediately | Vercel provides this automatically. For custom assets, use Cloudflare R2 |

---

## Monthly Cost Estimator

| Service | MVP (0-100 users) | Growth (100-1000) | Scale (1000+) |
|---------|-------------------|-------------------|---------------|
| Vercel (Frontend) | $0 (Hobby) | $20 (Pro) | $20-50 |
| Render (Backend) | $7 (Starter) | $25 (Standard) | $85+ |
| Supabase (Database) | $25 (Pro) | $25-100 | $100-400 |
| Cloudflare Stream | $10-50 (usage) | $50-200 | $200-1000 |
| Redis (optional) | $0 | $10 (Upstash) | $50-200 |
| Domain + SSL | $12/year | $12/year | $12/year |
| **Total Monthly** | **~$42-82** | **~$132-357** | **~$467-1750** |

*Costs are approximate and vary based on usage. Video streaming costs depend heavily on watch time.*

---

## Resources & Next Steps

### 📚 Essential Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [A-Frame Documentation](https://aframe.io/docs)
- [Socket.IO Documentation](https://socket.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Paystack API Docs](https://paystack.com/docs)
- [Cloudflare Stream Docs](https://developers.cloudflare.com/stream)

### 🧪 Testing Tools

- **Artillery.io** - Load testing for APIs and WebSockets
- **BrowserStack** - Cross-device testing
- **Lighthouse** - Performance auditing
- **WebXR Emulator** - Test VR without headset
- **Chrome DevTools** - Network and performance profiling

### 👥 Community & Support

- A-Frame Slack community
- Next.js Discord server
- WebXR Discord community
- Stack Overflow for technical issues
- Supabase Discord

### 🚀 Phase 2 Features (Post-MVP)

Once your MVP is live and validated, consider adding:

- **Voice chat** (WebRTC with SFU)
- **Advanced avatars** (Ready Player Me integration)
- **Spatial audio** (positional audio in 3D space)
- **Screen sharing** (share content with group)
- **Recording & replay** (save and replay events)
- **Mobile VR apps** (Native iOS/Android apps)
- **Private event hosting** (users can host their own screenings)
- **Subscription model** (monthly passes instead of per-ticket)
- **Live events** (live streaming with low latency)
- **Social features** (friend lists, profiles, reviews)

---

## 🏁 Quick Start Commands

Ready to begin? Run these commands:

```bash
# Clone or create project
npx create-next-app@latest vr-cinema --typescript --tailwind --app

# Navigate and install dependencies
cd vr-cinema
npm install socket.io-client aframe @supabase/supabase-js @supabase/auth-helpers-nextjs

# Create server directory
mkdir server
cd server
npm init -y
npm install express socket.io cors

# Create environment file
cd ..
touch .env.local

# Start development (in separate terminals)
npm run dev          # Frontend (port 3000)
node server/index.js # Backend (port 3001)
```

---

## 📝 Implementation Checklist

### Pre-Development
- [ ] Review entire guide
- [ ] Set up development environment
- [ ] Create accounts (Supabase, Vercel, Render, Cloudflare, Paystack)
- [ ] Plan your first 2-week sprint

### Phase 1: Foundation (Week 1)
- [ ] Initialize Next.js project
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Set up Socket.IO server
- [ ] Configure environment variables

### Phase 2: Auth & UI (Week 1-2)
- [ ] Implement authentication
- [ ] Build main layout
- [ ] Create event listing page
- [ ] Integrate payment system

### Phase 3: VR Lobby (Week 2-3)
- [ ] Create A-Frame VR scene
- [ ] Implement networked avatars
- [ ] Build chat system

### Phase 4: Groups & Playback (Week 3-4)
- [ ] Implement group system
- [ ] Add playback synchronization
- [ ] Integrate video player

### Phase 5: Admin Dashboard (Week 4-5)
- [ ] Build admin UI
- [ ] Add moderation tools
- [ ] Implement analytics

### Phase 6: Testing & Launch (Week 5-6)
- [ ] Cross-platform testing
- [ ] Performance optimization
- [ ] Load testing
- [ ] Deploy to production
- [ ] Launch! 🎉

---

## 💡 Pro Tips

1. **Start Small, Iterate Fast**
   - Don't try to build everything at once
   - Launch with core features, add extras later
   - Get real user feedback early

2. **Test on Real Devices**
   - VR headsets behave differently than emulators
   - Test on various network conditions
   - Nigeria-specific testing is crucial

3. **Monitor Everything**
   - Set up error tracking from day one
   - Watch performance metrics closely
   - Listen to user feedback

4. **Plan for Scale**
   - Even if starting small, architect for growth
   - Use managed services to reduce ops burden
   - Document everything

5. **Focus on UX**
   - Smooth onboarding is critical
   - Keep VR interactions simple and intuitive
   - Make payment flow frictionless

---

## 🎯 Success Metrics to Track

- **User Engagement:** Daily/weekly active users
- **Conversion Rate:** Visitors to ticket buyers
- **Retention:** Percentage returning for 2nd event
- **Technical:** Playback sync accuracy, latency, uptime
- **Revenue:** Total sales, average ticket price
- **Performance:** Page load time, video start time
- **Support:** Common user issues, resolution time

---

## ⚠️ Common Pitfalls to Avoid

1. **Not testing on real VR devices early** - Emulators don't catch everything
2. **Underestimating bandwidth requirements** - Nigeria's network infrastructure varies
3. **Skipping load testing** - Socket.IO can behave unexpectedly at scale
4. **Ignoring payment edge cases** - Network failures, partial payments, etc.
5. **Over-engineering the MVP** - Ship core features first
6. **Poor error handling** - Especially for network issues
7. **Not implementing proper moderation** - Essential from day one

---

## 📞 Need Help?

If you get stuck during implementation:

1. Check the official documentation for the specific tool
2. Search Stack Overflow for similar issues
3. Join relevant Discord/Slack communities
4. Review the code examples in this guide
5. Test in isolation to identify the problem component

---

## 🎬 Final Notes

**Remember:** This is an ambitious project, but it's absolutely doable in 6-8 weeks with focused effort. The key is to:

- Follow the phases sequentially
- Test continuously
- Don't skip the optimization phase
- Launch with core features, iterate based on feedback
- Have fun building something amazing! 🚀

Good luck with your VR Cinema platform! 🍿🎥

---

*Last Updated: 2025*