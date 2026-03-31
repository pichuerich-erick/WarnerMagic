$filePath = 'd:\PROYECTO PETER NOV 2025\PAGINA WEB TALLER\Proyecto_TRAVE_GT\index.html'
$html = [System.IO.File]::ReadAllText($filePath)

$serviciosCards = @"
                <div class="service-card"><i data-lucide="spray-can"></i>
                    <h3>Pintura Automotriz</h3><a href="Conocer mas.html" class="learn-more">CONOCER MÁS</a>
                </div>
                <div class="service-card"><i data-lucide="hammer"></i>
                    <h3>Hojalatería</h3><a href="Conocer mas.html" class="learn-more">CONOCER MÁS</a>
                </div>
                <div class="service-card"><i data-lucide="wrench"></i>
                    <h3>Mecánica</h3><a href="Conocer mas.html" class="learn-more">CONOCER MÁS</a>
                </div>
                <div class="service-card"><i data-lucide="shield-check"></i>
                    <h3>Película de Seguridad</h3><a href="Conocer mas.html" class="learn-more">CONOCER MÁS</a>
                </div>
                <div class="service-card"><i data-lucide="sparkles"></i>
                    <h3>Estética Automotriz</h3><a href="Conocer mas.html" class="learn-more">CONOCER MÁS</a>
                </div>
"@
$serviciosContent = ""
for ($i = 0; $i -lt 6; $i++) { $serviciosContent += $serviciosCards }

$marcasCards = @"
                <div class="brand-frame"><img src="gnp.png" alt="GNP"></div>
                <div class="brand-frame"><img src="hdi.png" alt="HDI"></div>
                <div class="brand-frame"><img src="chubb.png" alt="Chubb"></div>
                <div class="brand-frame"><img src="qualitas.png" alt="Qualitas"></div>
                <div class="brand-frame"><img src="honda.png" alt="Honda"></div>
                <div class="brand-frame"><img src="audi.png" alt="Audi"></div>
"@
$marcasContent = ""
for ($i = 0; $i -lt 6; $i++) { $marcasContent += $marcasCards }

$promosCards = @"
                <div class="promo-card">
                    <i data-lucide="circle-dollar-sign" size="40"></i>
                    <h3>Pintura de fascia</h3>
                    <span class="promo-price" style="font-size: 2.5rem; color: var(--accent);"`>$5,500 MXN</span>
                    <a href="https://wa.me/525518527424?text=Buen%20d%C3%ADa%2C%20me%20gustar%C3%ADa%20solicitar%20la%20promoci%C3%B3n%20de%20pintura%20de%20fascia" class="btn">Agenda tu cita</a>
                </div>
                <div class="promo-card">
                    <i data-lucide="circle-dollar-sign" size="40"></i>
                    <h3>Pintura de piezas</h3>
                    <span class="promo-price" style="font-size: 2.5rem; color: var(--accent);">10% OFF</span>
                    <p>A partir de 3 piezas</p>
                    <a href="https://wa.me/525518527424?text=Buen%20d%C3%ADa%2C%20me%20gustar%C3%ADa%20solicitar%20la%20promoci%C3%B3n%20de%2010%25%20de%20descuento" class="btn">Solicitar</a>
                </div>
                <div class="promo-card">
                    <i data-lucide="circle-dollar-sign" size="40"></i>
                    <h3>Pintura de pieza</h3>
                    <span class="promo-price" style="font-size: 2.5rem; color: var(--accent);"`>$2,315 MXN</span>
                    <a href="https://wa.me/525518527424?text=Buen%20d%C3%ADa%2C%20me%20gustar%C3%ADa%20solicitar%20la%20promoci%C3%B3n%20de%20pintura%20de%20pieza" class="btn">Agenda tu cita</a>
                </div>
                <div class="promo-card">
                    <i data-lucide="circle-dollar-sign" size="40"></i>
                    <h3>Pintura de carcasas</h3>
                    <span class="promo-price" style="font-size: 2.5rem; color: var(--accent);"`>$715 MXN</span>
                    <a href="https://wa.me/525518527424?text=Buen%20d%C3%ADa%2C%20me%20gustar%C3%ADa%20solicitar%20la%20promoci%C3%B3n%20de%20carcasas" class="btn">Solicitar</a>
                </div>
"@
$promosContent = ""
for ($i = 0; $i -lt 4; $i++) { $promosContent += $promosCards }

$newServicios = @"
<section id="servicios">
        <h2 style="text-align: center; font-size: 3rem; margin-bottom: 40px;">Nuestros Servicios</h2>
        <div class="carousel-viewport">
            <div class="carousel-track" style="animation-duration: 40s;">
$serviciosContent            </div>
        </div>
    </section>
"@

$newMarcas = @"
<section id="marcas" style="background: #050505;">
        <h2 style="text-align: center; margin-bottom: 40px;">Convenios y Marcas</h2>
        <div class="carousel-viewport">
            <div class="carousel-track" style="animation-duration: 45s; animation-direction: reverse;">
$marcasContent            </div>
        </div>
    </section>
"@

$newPromos = @"
<section id="promos" style="background: #0a0a0a;">
        <h2 style="text-align: center; margin-bottom: 40px;">Promociones Especiales</h2>
        <div class="carousel-viewport">
            <div class="carousel-track" style="animation-duration: 65s;">
$promosContent            </div>
        </div>
    </section>
"@

$html = $html -replace '(?s)<section id="servicios">.*?</section>', $newServicios
$html = $html -replace '(?s)<section id="marcas" style="background: #050505;">.*?</section>', $newMarcas
$html = $html -replace '(?s)<section id="promos" style="background: #0a0a0a;">.*?</section>', $newPromos

[System.IO.File]::WriteAllText($filePath, $html, [System.Text.Encoding]::UTF8)
Write-Output "Fixed HTML successfully"
