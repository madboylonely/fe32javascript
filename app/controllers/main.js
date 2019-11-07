// var mangNguoiDung = [];
var nguoiDungService = new NguoiDungService();

getListUser();

function themTestGit() {
    console.log("Them Test Git")
}

function themTaoLao() {
    console.log("Tao Lao")
}

getEle('btnThemNguoiDung').addEventListener("click", function() {
    var title = "Thêm Người Dùng";
    var footer = `
    <button id="btnThem" class="btn btn-success" onclick="themNguoiDung()">Thêm</button>
    `;
    
    getEle('TaiKhoan').disabled = false;
    document.getElementsByClassName('modal-title')[0].innerHTML = title;
    document.getElementsByClassName('modal-title')[0].style.textAlign = "center";
    document.getElementsByClassName('modal-footer')[0].innerHTML = footer;
});

function themNguoiDung() {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var soDT = getEle('SoDienThoai').value;
    var maLoaiNguoiDung = getEle('loaiNguoiDung').value;

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);

    nguoiDungService.themNguoiDung(nguoiDung)
        .then(function(result) {
            getListUser();
        }).catch(function(error) {
            console.log(error);
        });
} 

function renderTable(mangNguoiDung) {
    var tBody = getEle('tblDanhSachNguoiDung');
    var content = "";

    mangNguoiDung.map(function(item, index) {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.soDT}</td>
            <td>${item.maLoaiNguoiDung}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${item.id})">Sửa</button>            
                <button class="btn btn-danger" onclick="xoa(${item.id})">Xóa</button>            
            </td>
        </tr>`;
    });

    tBody.innerHTML = content;
}

function xoa(id) {
    nguoiDungService.xoaNguoiDung(id)
        .then(function(result) {
            getListUser();
        })
        .catch(function(error) {
            // error.response.data --> not found, not response, ...
            // error.response.status --> 404, 403, ... 500
            console.log(error)
        });
}

function sua(id) {
    var title = "Sửa người dùng";
    document.getElementsByClassName('modal-title')[0].innerHTML = title;

    var footer = `
        <button id="btnCapNhat" class="btn btn-success" onclick="capNhat(${id})">Cập Nhật</button>
    `
    document.getElementsByClassName('modal-footer')[0].innerHTML = footer;

    nguoiDungService.layThongTinNguoiDung(id)
        .then(function(result) {
            getEle('TaiKhoan').setAttribute("disabled", true);
            getEle('TaiKhoan').value = result.data.taiKhoan;
            getEle('HoTen').value = result.data.hoTen;
            getEle('MatKhau').value = result.data.matKhau;
            getEle('Email').value = result.data.email;
            getEle('SoDienThoai').value = result.data.soDT;
            getEle('loaiNguoiDung').value = result.data.maLoaiNguoiDung;

        })
        .catch(function() {
            console.log(error);
        }); 
}

function capNhat(id) {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var soDT = getEle('SoDienThoai').value;
    var maLoaiNguoiDung = getEle('loaiNguoiDung').value;
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    nguoiDungService.suaNguoiDung(id, nguoiDung)
        .then(function(result) {
            getListUser();
        })
        .catch(function(error) {
            console.log(error);
        });
}

// lưu mảng người dùng xuống localStorage
function setLocalStorage(mangNguoiDung) {
    localStorage.setItem("danhSachNguoiDung", JSON.stringify(mangNguoiDung));
}

// lấy mảng người dùng từ localStorage
function getLocalStorage() {
    if(localStorage.getItem("danhSachNguoiDung")) {
        return JSON.parse(localStorage.getItem("danhSachNguoiDung"));
    }
}

getEle('txtSearch').addEventListener("keyup", function() {
    var mangNguoiDung = getLocalStorage();
    var chuoiTimKiem = getEle('txtSearch').value;
    var mangTimKiem = nguoiDungService.timKiemNguoiDung2(chuoiTimKiem, mangNguoiDung);
    renderTable(mangTimKiem);
})

function getListUser() {
    nguoiDungService.layDanhSachNguoiDung()
        .then(function(result) {
            setLocalStorage(result.data);
            renderTable(result.data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getEle(id) {
    return document.getElementById(id);
}

// Gọi từ Back-end mà trả về status:200 là OK