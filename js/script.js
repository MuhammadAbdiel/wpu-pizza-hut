// * JQuery

// function tampilkanSemuaMenu() {
//     $.getJSON('data/pizza.json', function (hasil) {
//         let menu = hasil.menu;
//         $.each(menu, function (i, data) {
//             $("#daftar-menu").append(`
//                 <div class="col-md-4">
//                     <div class="card mb-3">
//                         <img src="img/menu/${data.gambar}" class="card-img-top">
//                         <div class="card-body">
//                             <h5 class="card-title">${data.nama}</h5>
//                             <p class="card-text">${data.deskripsi}</p>
//                             <h5 class="card-title">${data.harga}</h5>
//                             <a href="#" class="btn btn-primary">Pesan Sekarang</a>
//                         </div>
//                     </div>
//                 </div>
//             `);
//         });
//     });
// }

// tampilkanSemuaMenu();

// $(".nav-link").on("click", function () {
//     $(".nav-link").removeClass("active");
//     $(this).addClass("active");

//     let kategori = $(this).html();
//     $('h1').html(kategori);

//     if (kategori == "All Menu") {
//         tampilkanSemuaMenu();
//         return;
//     }

//     $.getJSON('data/pizza.json', function (hasil) {
//         let menu = hasil.menu;
//         let content = '';

//         $.each(menu, function (i, data) {
//             if (data.kategori == kategori.toLowerCase()) {
//                 content += `
//                     <div class="col-md-4">
//                         <div class="card mb-3">
//                         <img src="img/menu/${data.gambar}" class="card-img-top">
//                             <div class="card-body">
//                                 <h5 class="card-title">${data.nama}</h5>
//                                 <p class="card-text">${data.deskripsi}</p>
//                                 <h5 class="card-title">${data.harga}</h5>
//                                 <a href="#" class="btn btn-primary">Pesan Sekarang</a>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             }
//         });

//         $("#daftar-menu").html(content);
//     });
// });

// * Vanilla Javascript

function tampilkanSemuaMenu() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let hasil = JSON.parse(xhr.responseText);
            let menu = hasil.menu;

            const daftarMenu = document.getElementById("daftar-menu");
            menu.map(data => {
                daftarMenu.innerHTML += `
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="img/menu/${data.gambar}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${data.nama}</h5>
                                <p class="card-text">${data.deskripsi}</p>
                                <h5 class="card-title">Rp. ${data.harga}</h5>
                                <a href="#" class="btn btn-primary">Pesan Sekarang</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    }
    xhr.open('GET', 'data/pizza.json', true);
    xhr.send();
}

tampilkanSemuaMenu();

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach(link => {
    link.addEventListener('click', function (event) {
        navLink.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');

        let kategori = event.target.innerHTML;
        document.querySelector('h1').innerHTML = kategori;

        if (kategori == "All Menu") {
            tampilkanSemuaMenu();
            return;
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let hasil = JSON.parse(xhr.responseText);
                    let menu = hasil.menu;
                    let content = '';

                    menu.map(data => {
                        if (data.kategori == kategori.toLowerCase()) {
                            content += `
                                <div class="col-md-4">
                                    <div class="card mb-3">
                                        <img src="img/menu/${data.gambar}" class="card-img-top">
                                        <div class="card-body">
                                            <h5 class="card-title">${data.nama}</h5>
                                            <p class="card-text">${data.deskripsi}</p>
                                            <h5 class="card-title">Rp. ${data.harga}</h5>
                                            <a href="#" class="btn btn-primary">Pesan Sekarang</a>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                    });

                    const daftarMenu = document.getElementById("daftar-menu");
                    daftarMenu.innerHTML = content;
                }
            }
            xhr.open('GET', 'data/pizza.json', true);
            xhr.send();
        }

    });
});