<div align="center">
VIETNAM NATIONAL UNIVERSITY, HO CHI MINH CITY
<br />
UNIVERSITY OF TECHNOLOGY
<br />
FACULTY OF COMPUTER SCIENCE AND ENGINEERING
<br />
<br />

[![N|Solid](https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HCMUT_official_logo.png/238px-HCMUT_official_logo.png)](https://www.hcmut.edu.vn/vi)
<br />
<br />

**BTL Mạng Máy Tính / Semester 231**
<br/>

# BTL Mạng Máy Tính - FileSharing

## Team members

| No. | Name             | Student ID |
| :-: | ---------------- | :--------: |
|  1  | Nguyễn Tiến Đăng |  2011087   |

</div>

## Description

Ứng dụng sử dụng giao thức TCP/IP, mô hình p2p và socket.io để hiện thực yêu cầu của bài toán như sau: Khi máy khách yêu cầu một tệp không thuộc kho lưu trữ của nó, một yêu cầu sẽ được gửi đến máy chủ. Máy chủ xác định một số khách hàng khác lưu trữ tệp được yêu cầu và gửi danh tính của họ đến khách hàng yêu cầu. Máy khách sẽ chọn một nút nguồn thích hợp và sau đó tệp sẽ được máy khách yêu cầu tìm nạp trực tiếp từ nút có bản sao của tệp mà không yêu cầu bất kỳ sự can thiệp nào của máy chủ.

## Login/logout

Chức năng "Login" ở trong ứng dụng của nhóm là khi người dùng truy cập vào ứng dụng và nhập vào gmail, password. Hệ thống sẽ trả về kết quả là người dùng có đăng nhập thành công hay không. Nếu người dùng đã đăng nhập vào hệ thống thì có thể nhấn nút logout để đăng xuất.

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI8.png" align="center" width=1200px/>

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI9.png" align="center" width=1200px/>

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI10.png" align="center" width=1200px/>

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI11.png" align="center" width=1200px/>

## Publish File

Chức năng "Publish File" ở trong ứng dụng của nhóm có 2 cách

Một là sử dụng lệnh "publish <username> <lname> <fname>" ở trong terminal

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/command1.png" align="center" width=1200px/>

Hai là sử dụng form publish ở mục myfiles trong header

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI1.png" align="center" width=1200px/>

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI2.png" align="center" width=1200px/>

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI3.png" align="center" width=1200px/>

## Fetch File

Chức năng "Fetch File" ở trong ứng dụng của nhóm là sử dụng lệnh "fetch <username> <fname>" ở trong terminal

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/command2.png" align="center" width=1200px/>

## Discover hostname

Chức năng "Discover" ở trong ứng dụng của nhóm có 2 cách

Một là sử dụng lệnh "discover <hostname>" ở trong terminal

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/command3.png" align="center" width=1200px/>

Hai là sử dụng mục myfiles trong header. Khi cliend đã đăng nhập bấm vào myfiles, giao diện sẽ render ra những file đang nằm trong client’s repository

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI4.png" align="center" width=1200px/>

## Ping hostname

Chức năng "Ping" ở trong ứng dụng của nhóm là sử dụng lệnh "ping <hostname>" ở trong terminal. Sau khi chạy lệnh sẽ trả về những thông tin liên quan đến hostname như có active..

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/command4.png" align="center" width=1200px/>

## Search file

Chức năng "Search file" ở trong ứng dụng của nhóm là sử dụng lệnh form search ở header. Khi người dùng nhập vào tên của file và nhấn nút search. Hệ thống sẽ trả về là có đang có file đó không? Nếu có thì hiển thị thông tin của người giữ file để người tìm kiếm và người nắm giữ file có thể liên lạc với nhau và sử dụng chức năng truyền tải file

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI5.png" align="center" width=1200px/>

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI6.png" align="center" width=1200px/>

## View files

Chức năng "View files" ở trong ứng dụng của nhóm là khi người dùng truy cập vào ứng dụng sẽ thấy được tất cả các files mà những người dùng khác muốn chia sẻ.

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI7.png" align="center" width=1200px/>

## File transfer

Chức năng "File transfer" ở trong ứng dụng của nhóm là trên giao diện sử dụng các chức năng là sender và receiver (sender.ejs và receiver.ejs) để truyền tải file từ người gửi sang nhiều người nhận (có hỗ trợ đa luồng) bằng cách sử dụng server socket.io

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI3.png" align="center" width=1200px/>

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI4.png" align="center" width=1200px/>

<img src="https://github.com/Dang12312/File-Sharing/blob/main/public/img/UI5.png" align="center" width=1200px/>
