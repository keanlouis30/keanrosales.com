# CTF Challenges - Interactive Terminal Integration

## Overview

CTF (Capture The Flag) challenges have been successfully integrated into your portfolio's interactive terminal! Users can now access cybersecurity puzzles directly from your website.

## How to Access

1. **Navigate to your portfolio website**
2. **Scroll down to the "Interactive Terminal" section**
3. **Type `help` to see all available commands**
4. **Type `ctf` to see available challenges**
5. **Type `ctf 1` for Easy or `ctf 2` for Medium difficulty**

## Available Challenges

### Easy Challenge: "Pirate's First Code"
- **Category**: Cryptography
- **Difficulty**: Easy (100 points)
- **Description**: Caesar cipher decryption challenge
- **Encrypted Message**: "Wkh wuhdvxuh lv klgghq xqghu wkh rog rdn wuhh"
- **Solution**: Shift by 3 → "The treasure is hidden under the old oak tree"
- **Flag**: `CTF{the_treasure_is_hidden_under_the_old_oak_tree}`

### Medium Challenge: "Marine Intelligence"
- **Category**: Forensics  
- **Difficulty**: Medium (250 points)
- **Description**: File integrity verification challenge
- **Task**: Compare expected hashes vs actual file content
- **Expected hashes are for**: "hello"
- **Actual file contains**: Marine intelligence report with hidden flag
- **Flag**: `CTF{file_integrity_compromised_mission_exposed}`

### Hard Challenge: "The Road to Laugh Tale"
- **Category**: Multi-Stage Cryptography
- **Difficulty**: Hard (500 points) 
- **Theme**: One Piece pirate adventure
- **Description**: Multi-step challenge involving ROT13, steganography, and Vigenère cipher
- **Skills Required**: 
  - ROT13 decoding
  - Steganography analysis 
  - Vigenère cipher with custom key construction
  - One Piece knowledge (episode counts, character details)
- **Flag**: `CTF{GOMU_GOMU_LAUGHTALE_ONEPIECE_CIPHER}`

## Features

- **Terminal-themed UI** that matches your portfolio design
- **Interactive flag submission** with real-time feedback
- **Hints system** for stuck participants
- **Success/error feedback** with detailed explanations
- **Mobile responsive** design
- **Pirate/cybersecurity themed** challenges

## User Experience

1. Users type `ctf` in the interactive terminal
2. They see a list of available difficulty levels
3. They select a challenge with `ctf 1` or `ctf 2`
4. A modal opens with the full challenge details
5. They can submit flags and get immediate feedback
6. Success includes educational explanations about the techniques

## Technical Implementation

- **Frontend**: React component integrated into existing Extra.js
- **Styling**: Custom CSS matching your portfolio's green theme
- **State Management**: React hooks for challenge state
- **User Input**: Terminal-like interface with validation
- **Responsive**: Works on desktop and mobile devices

## Commands Added to Terminal

- `ctf` - Show available challenges
- `ctf 1` - Launch easy challenge
- `ctf 2` - Launch medium challenge  
- `ctf 3` - Launch hard challenge (One Piece themed!)

## Educational Value

These challenges help visitors learn:
- **Basic cryptography** (Caesar cipher)
- **Digital forensics** (hash verification)
- **Security concepts** (file integrity)
- **Problem-solving skills**
- **Terminal/command-line familiarity**

## Future Expansions

Potential additions:
- More difficulty levels
- Different challenge categories (Web, Reverse Engineering, etc.)
- Leaderboard system
- Timed challenges
- Progressive difficulty unlock

Your CTF system is now live and ready for visitors to enjoy! 🏴‍☠️

---

**Note**: The standalone `ctf` script in the root directory was created as a backup/reference but the main implementation is now integrated into your React portfolio for the best user experience.
