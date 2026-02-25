    const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        btn.onclick = () => menu.classList.toggle('hidden');
        document.querySelectorAll('#mobile-menu a').forEach(l => l.onclick = () => menu.classList.add('hidden'));