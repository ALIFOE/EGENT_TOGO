#!/usr/bin/env python3
"""
Script d'import des articles depuis https://alifoe.github.io/EGENT_TOGO/actualites
Récupère tous les articles de la page et les sauvegarde dans Firebase
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import sys
from datetime import datetime
from urllib.parse import urljoin

# Configuration
URL_SOURCE = "https://alifoe.github.io/EGENT_TOGO/actualites"
BASE_URL = "https://alifoe.github.io/EGENT_TOGO/"

# Couleurs pour le terminal
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'
BOLD = '\033[1m'


def generate_slug(title):
    """Générer un slug à partir du titre"""
    slug = title.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug[:50]


def fetch_page(url):
    """Récupérer le contenu de la page"""
    print(f"\n{BLUE}📡 Récupération de {url}...{RESET}")
    
    try:
        response = requests.get(
            url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout=10
        )
        response.raise_for_status()
        return response.text
    except Exception as e:
        print(f"{RED}❌ Erreur lors de la récupération: {e}{RESET}")
        return None


def parse_articles(html):
    """Parser les articles de la page HTML"""
    if not html:
        return []

    soup = BeautifulSoup(html, 'html.parser')
    articles = []

    print(f"{BLUE}🔍 Parsing des articles...{RESET}")

    # Stratégies de parsing - adapter selon la structure réelle
    # 1. Chercher des elements article
    article_elements = soup.find_all('article')
    if not article_elements:
        # 2. Chercher des divs avec classe article
        article_elements = soup.find_all('div', class_=re.compile('article|news|post|item', re.I))
    if not article_elements:
        # 3. Chercher des liens avec images
        article_elements = soup.find_all('a', href=re.compile('/article|/news|/actualite', re.I))

    print(f"{BLUE}   Trouvé {len(article_elements)} éléments article{RESET}")

    for idx, element in enumerate(article_elements):
        try:
            # Extraire le titre
            title_elem = element.find(['h2', 'h3', 'h4'])
            title = title_elem.get_text().strip() if title_elem else ""

            # Chercher un lien texte
            if not title:
                link = element.find('a')
                if link:
                    title = link.get_text().strip()

            if not title:
                continue

            # Extraire l'image
            img = element.find('img')
            image = ""
            if img:
                image = img.get('src') or img.get('data-src') or ""
                # Convertir URL relative en URL absolue
                if image and not image.startswith('http'):
                    image = urljoin(BASE_URL, image)

            # Extraire le résumé/description
            excerpt = ""
            p_elem = element.find('p')
            if p_elem:
                excerpt = p_elem.get_text().strip()

            # Extraire la catégorie
            category = "Actualité"
            category_elem = element.find(class_=re.compile('category|badge|tag|cat', re.I))
            if category_elem:
                category = category_elem.get_text().strip()

            # Extraire la date
            date_str = datetime.now().strftime('%d %b %Y').title()
            date_elem = element.find(['time', 'span'], class_=re.compile('date|time|posted', re.I))
            if date_elem:
                date_str = date_elem.get_text().strip()

            # Créer l'article
            article = {
                'title': title,
                'slug': generate_slug(title),
                'excerpt': excerpt[:200] if excerpt else title,
                'content': f"<h2>{title}</h2><p>{excerpt}</p>" if excerpt else f"<h2>{title}</h2>",
                'image': image,
                'category': category,
                'date': date_str,
                'author': 'EGENT-TOGO'
            }

            articles.append(article)
            print(f"   {GREEN}✓{RESET} {idx + 1}. {title[:60]}")

        except Exception as e:
            print(f"   {YELLOW}⚠{RESET} Erreur parsing: {str(e)[:50]}")
            continue

    return articles


def save_to_json(articles, filename="articles_import.json"):
    """Sauvegarder les articles en JSON pour révision"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    print(f"{GREEN}✓ Articles sauvegardés dans {filename}{RESET}")


def display_articles(articles):
    """Afficher un aperçu des articles"""
    print(f"\n{BOLD}{BLUE}📋 Aperçu des articles (premiers 5):{RESET}")
    
    for idx, article in enumerate(articles[:5]):
        print(f"\n   [{idx + 1}] {article['title']}")
        print(f"       Slug: {article['slug']}")
        print(f"       Catégorie: {article['category']}")
        print(f"       Date: {article['date']}")
        print(f"       Image: {'✓' if article['image'] else '✗'}")
        print(f"       Résumé: {article['excerpt'][:80]}...")

    if len(articles) > 5:
        print(f"\n   ... et {len(articles) - 5} autres articles")


def main():
    print(f"\n{BOLD}{BLUE}{'='*60}")
    print(f"🚀 SCRIPT D'IMPORT D'ARTICLES")
    print(f"{'='*60}{RESET}\n")

    # Récupérer la page
    html = fetch_page(URL_SOURCE)
    if not html:
        print(f"{RED}Impossible de récupérer la page. Vérifiez l'URL.{RESET}")
        sys.exit(1)

    # Parser les articles
    articles = parse_articles(html)
    
    if not articles:
        print(f"{YELLOW}⚠ Aucun article trouvé. Vérifiez la structure HTML de la page.{RESET}")
        print(f"{BLUE}Sauvegarde du HTML pour inspection...{RESET}")
        with open('page_source.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"{GREEN}✓ HTML sauvegardé dans page_source.html{RESET}")
        sys.exit(1)

    # Afficher l'aperçu
    print(f"\n{GREEN}✅ {len(articles)} articles trouvés!{RESET}")
    display_articles(articles)

    # Sauvegarder en JSON
    save_to_json(articles)

    # Afficher les instructions
    print(f"\n{BOLD}{BLUE}📖 Prochaines étapes:{RESET}")
    print(f"   1. Vérifiez le fichier {BLUE}articles_import.json{RESET}")
    print(f"   2. Ouvrez l'interface d'import: {BLUE}/admin/import-articles{RESET}")
    print(f"   3. Cliquez sur 'Récupérer les articles' pour charger les données")
    print(f"   4. Vérifiez et lancez l'import")

    print(f"\n{BOLD}{GREEN}✨ Import prêt!{RESET}\n")


if __name__ == '__main__':
    main()
