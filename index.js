
          let map, infoWindow;
          
          // Initialize and add the map
        function initMap() {
            // ウルルの位置を取得
            const uluru = { lat: -25.344, lng: 131.031 };
            // マップの中央をウルルの位置に設定
            const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: uluru,
            });
            // ウルルの位置にマーカーを設定
            const marker = new google.maps.Marker({
            position: uluru,
            map: map,
            icon: {
                url: '/location.png',// お好みの画像までのパスを指定
                scaledSize : new google.maps.Size(24, 20)
              }
            });

        //指定された位置でポップアップウィンドウを表示
        infoWindow = new google.maps.InfoWindow();

        //現在地を取得するボタンを作成
        const locationButton = document.createElement("button");

        //ボタンのテキストを設定
        locationButton.textContent = "Pan to Current Location";
        //ボタンにクラスを追加
        locationButton.classList.add("custom-map-control-button");
        //地図の表示位置を指定
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const pos = {
                //緯度と経度を取得
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

          infoWindow.setPosition(pos);
          infoWindow.setContent("現在地");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
        }


        //エラーの表示
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(
              browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
          }
        
        window.initMap = initMap;

       