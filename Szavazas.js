$(document).ready(function() {
    
    
    function updateResult() {
        var szavazatok = getSzavazat();
        var osszSzavazat = getOsszSzavazat(szavazatok);

        $('#eredmeny').empty();
        for (var key in szavazatok) {
            var ossz = szavazatok[key];
            var szazalek = (ossz / osszSzavazat) * 100;

            $('#eredmeny').append(
                '<p>' + key + ': ' + ossz + ' szavazat (' +
                szazalek.toFixed(2) + '%)</p>' +
                '<div class="folyamat-sav">' +
                '<div class="folyamat" style="width: ' +
                szazalek + '%"></div>' +
                '</div>'
            );
        }
    }


    function getSzavazat() {
        var szavazatok = localStorage.getItem('szavazatok');
        return szavazatok ? JSON.parse(szavazatok) : {};
    }

    
    function mentes(szavazatok) {
        localStorage.setItem('szavazatok', JSON.stringify(szavazatok));
    }


    function getOsszSzavazat(szavazatok) {
        return Object.values(szavazatok).reduce((acc, ossz) => acc + ossz, 0);
    }


    function szavazhat() {
        var utolsoSzavazat = localStorage.getItem('utolsoSzavazat');
        if (!utolsoSzavazat) {
            return true;
        }

        var ido = new Date().getTime();
        var egyOra = 1;
        return ido - utolsoSzavazat > egyOra;
    }


    $('#szavazoGomb').click(function() {
        if (szavazhat()) {
            var valasztott = $('input[name=vote]:checked').val();
            if (valasztott) {
                var szavazatok = getSzavazat();
                szavazatok[valasztott] = (szavazatok[valasztott] || 0) + 1;
                mentes(szavazatok);

                
                localStorage.setItem('utolsoSzavazat', new Date().getTime());

                updateResult();
                alert('Sikeres szavazás!');
            } else {
                alert('Válassz egy opciót!');
            }
        } else {
            alert('Már szavaztál az elmúlt órában. Kérlek próbáld újra később!');
        }
    });

    
    updateResult();
});