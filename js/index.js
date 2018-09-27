//$(function(){
	
	//获取当前城市的天气情况
	let tianqi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType:"jsonp",
		success:function(obj){
//			console.log(obj);
			tianqi=obj.data;
			console.log(tianqi);
			updata(tianqi);
		}
	})
	
	function updata(tianqi){
		//获取当前城市
		$(".header .place span").html(tianqi.city);
		//获取当前城市的空气状况
		$(".header .air .qk").html(tianqi.weather.quality_level);
		//获取当前的温度
		$(".header .positive").html(tianqi.weather.current_temperature+"°");
		//获取当前的天气状况
		$(".header .txt-weather").html(tianqi.weather.current_condition);
		//获取当前风力
		$(".header .ct-wind").html(tianqi.weather.wind_direction+"&nbsp;"+tianqi.weather.wind_level+"级");
		//今天
		$(".con .today .temperature span:first-child").html(tianqi.weather.dat_high_temperature);
		$(".con .today .temperature span:last-child").html(tianqi.weather.dat_low_temperature+"°C");
		$(".con .today .bottom .weather").html(tianqi.weather.dat_condition);
console.log(tianqi.weather.dat_weather_icon_id);
		$(".sui").attr("src","img/"+tianqi.weather.dat_weather_icon_id+".png")
		//明天
		$(".con .tomorrow .temperature span:first").html(tianqi.weather.high_temperature);
		$(".con .tomorrow .temperature span:last").html(tianqi.weather.low_temperature+"°C");
		$(".con .tomorrow .bottom .weather").html(tianqi.weather.tomorrow_condition);
		$(".to").attr("src","img/"+tianqi.weather.tomorrow_weather_icon_id+".png");
		//未来24小时的天气
		let hweather=tianqi.weather.hourly_forecast;
		$(".container .ct-scroll ol").html("");   //清空
		hweather.forEach(function(v){
			let str=`<li class="item">
					<p class="txt-times">${v.hour}:00</p>
					<img src="img/${v.weather_icon_id}.png" alt="" />
					<p class="txt-degree">${v.temperature}°</p>
				</li>`
			$(".container .ct-scroll ol").append(str);
		})
		
		//未来半个月的天气
		let wweather=tianqi.weather.forecast_list;
		$(".sec-days .ct-scroll ol").html("");  //清空
		wweather.forEach(function(v){
			let str1=`<li>
					<p class="date">${v.date.substr(5,5)}</p>
					<div class="ct-daytime">
						<p class="weather">${v.condition.split("转")[0]}</p>
						<img src="img/${v.weather_icon_id}.png" alt="" />
					</div>
					<div class="ct-night">
						<img src="img/${v.weather_icon_id}.png" alt="" />
						<p class="weather">${v.condition.includes("转")?v.condition.split("转")[1]:v.condition}</p>
					</div>
					<p class="wind">${v.wind_direction}</p>
					<p class="wind">${v.wind_level}级</p>
				</li>`
			$(".sec-days .ct-scroll ol").append(str1);
		})
	}
	
	
	$(".header .place span").click(function(){
		$(".sec-location").css({"display":"block"});
	})
	
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city=obj.data;
			console.log(city);
			updataCity(city);
		}
	})
	
	//获取每个城市信息
	function updataCity(city){
		for(let i in city){
//			console.log(city[i]);
//			let str1=`<p class="title hot">${i}</p>
//			<ul class="remen"></ul>`;
//			$(".ct-hot-city").append(str1);
			for(let j in city[i]){
//				console.log(j);
				let str=`<li class="ls-city">${j}</li>`;
				$(".remen").append(str);
			}
			
		}
	}
	
	//点击每个城市，获取当前城市的天气信息
	window.onload=function(){
		$(".sec-location li").click(function(){
			$(".sec-location").css({"display":"none"});
			let con=$(this).html();
			console.log(con);
			ajaxs(con);
		})
		
		function ajaxs(tianqi1){
//			let tianqi1;
			$.ajax({
				type:"get",
				url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi1}`,
				dataType:"jsonp",
				success:function(obj){
					tianqi1=obj.data;
					console.log(tianqi1);
					updata(tianqi1);
				}
			});
		}
		//在搜索框内输入内容可以获得输入城市的天气信息
		$(".ct-input input").focus(function(){
			$(".sec-location .button").html("搜索");
		})
		$(".ct-input input").blur(function(){
			$(".sec-location .button").html("取消");
		})
		//当点击搜索时，获得input中的内容进行搜索
		$(".sec-location .button").click(function(){
//			if()
			$(".sec-location").css({"display":"none"});
			let text=$(".ct-input input").val();
			console.log(text);
			for(let i in city){
				for(let j in city[i]){
					if(text==j){
						ajaxs(text);
						return;
					}
				}
			}
			alert("该城市不存在");
		})
	}


//1.获取默认城市的天气信息
//2，获取所有城市的信息
//3.点击每个城市可以获取当前城市的天气信息
//4.在搜索框内输入要搜索的城市，点击搜索按钮可以进行搜索