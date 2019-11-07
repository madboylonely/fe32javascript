function NguoiDungService() {
    this.mangNguoiDung = [];

    this.layDanhSachNguoiDung = function() {
        return axios({
            method: "GET",
            url: "http://5dbacba03ec5fb00143193fe.mockapi.io/api/NGUOIDUNG"
        });
        // cái axios() này trả về một cái Promise. Nếu thành công thì thực hiện .then() còn không được thì thực hiện .catch()
        
    };
    
    this.themNguoiDung = function(nguoiDung) {
        return axios({
            method: "POST",
            url: "http://5dbacba03ec5fb00143193fe.mockapi.io/api/NGUOIDUNG",
            data: nguoiDung
        });
    };
    
    this.xoaNguoiDung = function(id) {
        return axios({
            method: "DELETE",
            url: `http://5dbacba03ec5fb00143193fe.mockapi.io/api/NGUOIDUNG/${id}`
        });
    }
    
    this.suaNguoiDung = function(id, nguoiDung) {
        return axios({
            method: "PUT",
            url: `http://5dbacba03ec5fb00143193fe.mockapi.io/api/NGUOIDUNG/${id}`,
            data: nguoiDung
        });
    }
    
    this.layThongTinNguoiDung = function(id) {
        // var viTri = this.layViTri(id);
        // var nguoiDung = mangNguoiDung[viTri];
        return axios({
            method: "GET",
            url: `http://5dbacba03ec5fb00143193fe.mockapi.io/api/NGUOIDUNG/${id}`
        });
    }

    this.timKiemNguoiDung = function(chuoiTimKiem, mangNguoiDung) {
        var mangTimKiem = [];
        mangNguoiDung.map(function(item, index) {
            if (item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
                mangTimKiem.push(item);
            }
        });
        return mangTimKiem;
    }

    this.timKiemNguoiDung2 = function(chuoiTimKiem, mangNguoiDung) {
        return mangNguoiDung.filter(function(item) {
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
        });
    }
}

/**
 * sử dụng một số giao thức trong HTTP để giao tiếp với Server thông qua API
 * GET: lấy danh sách người dùng về 
 * POST: thêm người dùng vào Server
 * PUT: cập nhật người dùng
 * DELETE: xóa người dùng 
 */
