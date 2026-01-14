#!/usr/bin/env python3
"""
GitHub Gist yaratish va ID olish uchun script
"""

import requests
import json
import os

# Token'ni environment variable'dan oling
# export GITHUB_TOKEN="your-token-here" yoki .env faylda
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    print("❌ GITHUB_TOKEN environment variable sozlanmagan!")
    print("   Quyidagicha sozlang: export GITHUB_TOKEN='your-token'")
    exit(1)

def create_gist():
    """Yangi Gist yaratish"""
    url = "https://api.github.com/gists"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # Boshlang'ich ma'lumotlar
    initial_data = {
        "timestamp": [],
        "user_id": [],
        "question_id": [],
        "answer": []
    }
    
    payload = {
        "description": "AI Resistance Survey - Responses Storage",
        "public": False,  # Private gist
        "files": {
            "responses.json": {
                "content": json.dumps(initial_data, indent=2, ensure_ascii=False)
            }
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        
        gist_data = response.json()
        gist_id = gist_data["id"]
        gist_url = gist_data["html_url"]
        
        print("✅ Gist muvaffaqiyatli yaratildi!")
        print(f"📋 Gist ID: {gist_id}")
        print(f"🔗 Gist URL: {gist_url}")
        print(f"\n📝 config.js faylida GIST_ID ni quyidagicha o'zgartiring:")
        print(f"   GIST_ID: '{gist_id}'")
        
        return gist_id
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Xatolik: {e}")
        if hasattr(e.response, 'text'):
            print(f"   Javob: {e.response.text}")
        return None

def get_existing_gists():
    """Mavjud Gist'larni ko'rsatish"""
    url = "https://api.github.com/gists"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        gists = response.json()
        print(f"\n📚 Sizda {len(gists)} ta Gist mavjud:\n")
        
        for gist in gists[:10]:  # Faqat birinchi 10 tasini ko'rsatish
            description = gist.get("description", "No description")
            gist_id = gist["id"]
            created = gist["created_at"][:10]
            print(f"  • {gist_id} - {description} (Created: {created})")
        
        if len(gists) > 10:
            print(f"\n  ... va yana {len(gists) - 10} ta")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Xatolik: {e}")

if __name__ == "__main__":
    print("🚀 GitHub Gist yaratish\n")
    print("Variantlar:")
    print("1. Yangi Gist yaratish")
    print("2. Mavjud Gist'larni ko'rsatish")
    
    choice = input("\nTanlang (1 yoki 2): ").strip()
    
    if choice == "1":
        gist_id = create_gist()
        if gist_id:
            print(f"\n✅ Gist ID: {gist_id}")
    elif choice == "2":
        get_existing_gists()
    else:
        print("❌ Noto'g'ri tanlov!")
