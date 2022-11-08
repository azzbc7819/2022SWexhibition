$(document).ready(async function () {
    let XY = await getLocation(); // 사용자의 위도와 경도를 받아옴
    //alert("위도 : " + XY.lat); // 위도 알림창
    //alert("경도 : " + XY.lng); // 경도 알림창
    var map = new naver.maps.Map('map', { // 지도 띄우기
        center: new naver.maps.LatLng(37.3595316, 127.1052133),
        zoom: 7,
        zoomControl: true, //줌 컨트롤의 표시 여부
        zoomControlOptions: { //줌 컨트롤의 옵션
            position: naver.maps.Position.TOP_RIGHT
        }
    });
    var infoWindow = new naver.maps.InfoWindow({
        anchorSkew: true
    });

    // map.setCursor('pointer');

    // function searchCoordinateToAddress(latlng) {

    //     infoWindow.close();

    //     naver.maps.Service.reverseGeocode({
    //         coords: latlng,
    //         orders: [
    //             naver.maps.Service.OrderType.ADDR,
    //             naver.maps.Service.OrderType.ROAD_ADDR
    //         ].join(',')
    //     }, function (status, response) {
    //         if (status === naver.maps.Service.Status.ERROR) {
    //             if (!latlng) {
    //                 return alert('ReverseGeocode Error, Please check latlng');
    //             }
    //             if (latlng.toString) {
    //                 return alert('ReverseGeocode Error, latlng:' + latlng.toString());
    //             }
    //             if (latlng.x && latlng.y) {
    //                 return alert('ReverseGeocode Error, x:' + latlng.x + ', y:' + latlng.y);
    //             }
    //             return alert('ReverseGeocode Error, Please check latlng');
    //         }

    //         var address = response.v2.address,
    //             htmlAddresses = [];

    //         if (address.jibunAddress !== '') {
    //             htmlAddresses.push('[지번 주소] ' + address.jibunAddress);
    //         }

    //         if (address.roadAddress !== '') {
    //             htmlAddresses.push('[도로명 주소] ' + address.roadAddress);
    //         }

    //         infoWindow.setContent([
    //             '<div style="padding:10px;min-width:200px;line-height:150%;">',
    //             '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
    //             htmlAddresses.join('<br />'),
    //             '</div>'
    //         ].join('\n'));

    //         infoWindow.open(map, latlng);
    //     });
    // }

    // function searchAddressToCoordinate(address) {

    //     naver.maps.Service.geocode({
    //         query: address
    //     }, function (status, response) {
    //         if (status === naver.maps.Service.Status.ERROR) {
    //             if (!address) {
    //                 return alert('Geocode Error, Please check address');
    //             }
    //             return alert('Geocode Error, address:' + address);
    //         }

    //         if (response.v2.meta.totalCount === 0) {
    //             return alert('No result.');
    //         }

    //         var htmlAddresses = [],
    //             item = response.v2.addresses[0],
    //             point = new naver.maps.Point(item.x, item.y);


    //         if (item.roadAddress) {
    //             htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
    //         }

    //         if (item.jibunAddress) {
    //             htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
    //         }

    //         if (item.englishAddress) {
    //             htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
    //         }

    //         infoWindow.setContent([
    //             '<div style="padding:10px;min-width:200px;line-height:150%;">',
    //             '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
    //             htmlAddresses.join('<br />'),
    //             '</div>'
    //         ].join('\n'));

    //         map.setCenter(point);
    //         infoWindow.open(map, point);
    //     });
    // }

    // function initGeocoder() {
    //     if (!map.isStyleMapReady) {
    //         return;
    //     }

    //     map.addListener('click', function (e) {
    //         searchCoordinateToAddress(e.coord);
    //     });

    //     $('#address').on('keydown', function (e) {
    //         var keyCode = e.which;

    //         if (keyCode === 13) { // Enter Key
    //             searchAddressToCoordinate($('#address').val());
    //         }
    //     });

    //     // $('#submit').on('click', function (e) {
    //     //     e.preventDefault();

    //     //     searchAddressToCoordinate($('#address').val());
    //     // });

    //     searchAddressToCoordinate('정자동 178-1');
    // }

    // naver.maps.onJSContentLoaded = initGeocoder;
    // naver.maps.Event.once(map, 'init_stylemap', initGeocoder);

    var location = new naver.maps.LatLng(XY.lat, XY.lng); // 현재 위치 위도 경도

    b1.onclick = function () {
        var marker = new naver.maps.Marker({ // 마커찍기
            position: new naver.maps.LatLng(XY.lat, XY.lng),
            map: map
        });
        map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
        map.setZoom(17); // 지도의 줌 레벨을 변경합니다.
    };
});

async function getLocation() { // 접속한사람 위치 조회
    let XY = new Object(); // 위치 반환할 것

    if (navigator.geolocation) { // GPS와 관련된 객체, 이 객체가 존재할때 실행    
        let promise = new Promise((resolve, rejected) => { // 비동기식을 동기식으로
            navigator.geolocation.getCurrentPosition((position) => {
                //현재 위치를 알수 있는 함수 인자로 position 객체를 통해 현재 위치를 알 수 있음
                resolve(position);
            });
        });

        let position = await promise;
        //position.coords.latitude 위도
        //position.coords.longitude 경도
        XY.lat = position.coords.latitude;
        XY.lng = position.coords.longitude;
    }
    return XY;
}