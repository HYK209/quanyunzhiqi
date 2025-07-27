import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Cloud, Sun, CloudRain, Navigation, ExternalLink } from 'lucide-react';

interface CulturalRoutesProps {
  onBack: () => void;
}

interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
}

interface Attraction {
  id: string;
  name: string;
  description: string;
  duration: string;
  tips: string;
  image: string;
}

const CulturalRoutes: React.FC<CulturalRoutesProps> = ({ onBack }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // 济南坐标 (纬度: 36.6686, 经度: 117.0249)
  const JINAN_LAT = 36.6686;
  const JINAN_LON = 117.0249;

  // 获取天气信息
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${JINAN_LAT}&longitude=${JINAN_LON}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Asia/Shanghai`
        );
        
        if (!response.ok) {
          throw new Error('天气数据获取失败');
        }
        
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          windSpeed: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m
        });
      } catch (error) {
        setWeatherError('天气信息暂时无法获取');
        console.error('Weather fetch error:', error);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // 天气代码转换为描述和图标
  const getWeatherInfo = (code: number) => {
    if (code <= 1) return { desc: '晴朗', icon: Sun, color: 'text-yellow-500' };
    if (code <= 3) return { desc: '多云', icon: Cloud, color: 'text-gray-500' };
    if (code <= 67) return { desc: '雨天', icon: CloudRain, color: 'text-blue-500' };
    return { desc: '未知', icon: Cloud, color: 'text-gray-500' };
  };

  // 第一天行程
  const day1Attractions: Attraction[] = [
    {
      id: '1',
      name: '五龙潭',
      description: '五泉汇聚，古韵悠长',
      duration: '1小时',
      tips: '建议上午游览，人少景美',
      image: 'https://img1.qunarzz.com/travel/d5/1703/5b/4590a549977c07b5.jpg_r_640x426x70_16dec1a9.jpg'
    },
    {
      id: '2',
      name: '趵突泉',
      description: '天下第一泉，济南标志',
      duration: '1.5小时',
      tips: '必游景点，建议购买联票',
      image: 'https://static.yueya.net/shuomingshu.cn//wp-content/uploads/images/2022/11/25/daeace802891460c8c08c5f74570d727_mugypk0a1st.jpg'
    },
    {
      id: '3',
      name: '泉城广场',
      description: '城市中心，文化地标',
      duration: '30分钟',
      tips: '适合拍照留念',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxbzw8F6A.jpg'
    },
    {
      id: '4',
      name: '黑虎泉',
      description: '虎啸泉涌，声震四方',
      duration: '45分钟',
      tips: '可以打泉水带走',
      image: 'https://youimg1.c-ctrip.com/target/100o0z000000n5xzw010C.jpg'
    },
    {
      id: '5',
      name: '解放阁',
      description: '革命纪念，历史见证',
      duration: '30分钟',
      tips: '登高望远，俯瞰泉城',
      image: 'https://n.sinaimg.cn/sinacn20116/213/w2048h1365/20190425/0b5e-hvhiqax4904280.jpg'
    },
    {
      id: '6',
      name: '宽厚里',
      description: '传统商街，美食天堂',
      duration: '2小时',
      tips: '晚餐首选，品尝鲁菜',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc0w2E1B.jpg'
    },
    {
      id: '7',
      name: '曲水亭街',
      description: '古街流水，诗意栖居',
      duration: '1小时',
      tips: '夜景更美，适合漫步',
      image: 'https://n.sinaimg.cn/sinakd20113/762/w1000h562/20230525/ba96-814fb69e446ec5569624ba8466b8c211.jpg'
    },
    {
      id: '8',
      name: '大明湖',
      description: '四面荷花三面柳',
      duration: '1.5小时',
      tips: '可乘船游湖',
      image: 'https://tr-osdcp.qunarzz.com/tr-osd-tr-space/img/77d3d6af91fc8a213b2ce05a07e1f9cd.jpg_r_1360x1360x95_9aba5968.jpg'
    },
    {
      id: '9',
      name: '超然楼',
      description: '湖心古楼，超然物外',
      duration: '30分钟',
      tips: '夜晚灯光璀璨',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc1w7B3D.jpg'
    }
  ];

  // 第二天行程
  const day2Attractions: Attraction[] = [
    {
      id: '10',
      name: '洪家楼天主教堂',
      description: '哥特建筑，宗教文化',
      duration: '45分钟',
      tips: '建筑摄影绝佳地点',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc2w9A5E.jpg'
    },
    {
      id: '11',
      name: '万象城',
      description: '现代商业，购物休闲',
      duration: '2小时',
      tips: '购物用餐一站式',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc3wB67F.jpg'
    },
    {
      id: '12',
      name: '山东博物馆',
      description: '齐鲁文化，历史珍藏',
      duration: '2.5小时',
      tips: '需预约，周一闭馆',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc4wD28G.jpg'
    },
    {
      id: '13',
      name: '大观园',
      description: '古典园林，文化体验',
      duration: '1.5小时',
      tips: '适合下午游览',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc5wF89H.jpg'
    },
    {
      id: '14',
      name: '经三路老商埠',
      description: '百年商埠，历史街区',
      duration: '1小时',
      tips: '感受老济南风情',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc6wH4AI.jpg'
    },
    {
      id: '15',
      name: '中山公园',
      description: '城市绿肺，休闲胜地',
      duration: '1小时',
      tips: '适合傍晚散步',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc7wJ5BJ.jpg'
    },
    {
      id: '16',
      name: '环联夜市',
      description: '夜市文化，美食聚集',
      duration: '2小时',
      tips: '夜晚必去，体验夜生活',
      image: 'https://youimg1.c-ctrip.com/target/100c0z000000mxc8wL6CK.jpg'
    }
  ];

  // S形布局渲染函数
  const renderSShapeRow = (attractions: Attraction[], rowIndex: number) => {
    const isReverse = rowIndex % 2 === 1;
    const rowAttractions = attractions.slice(rowIndex * 3, (rowIndex + 1) * 3);
    
    if (rowAttractions.length === 0) return null;

    return (
      <div key={rowIndex} className={`flex ${isReverse ? 'flex-row-reverse' : 'flex-row'} justify-center items-center gap-8 mb-12`}>
        {rowAttractions.map((attraction, index) => (
          <div key={attraction.id} className="group relative">
            {/* 连接线 */}
            {index < rowAttractions.length - 1 && (
              <div className={`absolute top-1/2 ${isReverse ? 'left-0' : 'right-0'} transform -translate-y-1/2 ${isReverse ? '-translate-x-full' : 'translate-x-full'} w-8 h-0.5 bg-blue-300 z-0`}>
                <div className={`absolute ${isReverse ? 'left-0' : 'right-0'} top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full`}></div>
              </div>
            )}
            
            {/* 景点卡片 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-64 z-10 relative">
              <div className="relative h-40">
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold mb-1">{attraction.name}</h3>
                    <p className="text-sm opacity-90">{attraction.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{attraction.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>济南</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">💡 游览贴士：</span>
                    {attraction.tips}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-800 hover:text-blue-900 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">返回首页</span>
            </button>
            
            <h1 className="text-2xl font-bold text-slate-800">济南文化旅游路线</h1>
            
            {/* 天气和交通信息 */}
            <div className="flex items-center gap-6">
              {/* 天气信息 */}
              <div className="bg-blue-50 rounded-lg p-3 min-w-[200px]">
                {weatherLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    <span className="text-sm text-blue-700">获取天气中...</span>
                  </div>
                ) : weatherError ? (
                  <div className="text-sm text-red-600">{weatherError}</div>
                ) : weather ? (
                  <div className="flex items-center gap-3">
                    {(() => {
                      const weatherInfo = getWeatherInfo(weather.weatherCode);
                      const WeatherIcon = weatherInfo.icon;
                      return (
                        <>
                          <WeatherIcon className={`w-5 h-5 ${weatherInfo.color}`} />
                          <div>
                            <div className="text-sm font-semibold text-slate-800">
                              济南 {weather.temperature}°C
                            </div>
                            <div className="text-xs text-slate-600">
                              {weatherInfo.desc} · 湿度{weather.humidity}%
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : null}
              </div>
              
              {/* 交通信息 */}
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">实时交通</div>
                    <div className="flex gap-2 text-xs">
                      <a 
                        href="https://map.baidu.com/search/济南/@13365893.17,4383386.84,11z?querytype=c&c=济南" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        百度地图 <ExternalLink className="w-3 h-3" />
                      </a>
                      <a 
                        href="https://www.amap.com/search?query=济南&city=370100" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        高德地图 <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Day 1 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h2 className="text-2xl font-bold text-slate-800">第一天：泉水文化深度游</h2>
            </div>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              从五龙潭开始，沿着泉水脉络，感受济南独特的泉水文化，体验古城的历史韵味
            </p>
          </div>
          
          {/* S形布局 - Day 1 */}
          <div className="relative">
            {Array.from({ length: Math.ceil(day1Attractions.length / 3) }, (_, index) => 
              renderSShapeRow(day1Attractions, index)
            )}
          </div>
        </div>

        {/* Day 2 */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h2 className="text-2xl font-bold text-slate-800">第二天：现代文化体验游</h2>
            </div>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              探索济南的现代面貌，从宗教建筑到博物馆，从商业中心到夜市文化，全方位体验泉城魅力
            </p>
          </div>
          
          {/* S形布局 - Day 2 */}
          <div className="relative">
            {Array.from({ length: Math.ceil(day2Attractions.length / 3) }, (_, index) => 
              renderSShapeRow(day2Attractions, index)
            )}
          </div>
        </div>

        {/* 旅游贴士 */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              💡
            </div>
            旅游贴士
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">🚗 交通建议</h4>
              <p className="text-sm text-blue-700">建议使用公共交通或共享单车，景点间距离适中，步行体验更佳。</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🎫 门票信息</h4>
              <p className="text-sm text-green-700">趵突泉、大明湖等景点建议购买联票，更加经济实惠。</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">🍜 美食推荐</h4>
              <p className="text-sm text-purple-700">宽厚里和环联夜市是品尝济南特色美食的最佳选择。</p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">📱 实用APP</h4>
              <p className="text-sm text-orange-700">下载"济南通"APP，查看实时公交信息和景点介绍。</p>
            </div>
            
            <div className="bg-pink-50 rounded-lg p-4">
              <h4 className="font-semibold text-pink-800 mb-2">⏰ 最佳时间</h4>
              <p className="text-sm text-pink-700">春秋两季最适宜游览，夏季可体验泉水的清凉。</p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 mb-2">📸 拍照建议</h4>
              <p className="text-sm text-indigo-700">黄昏时分的大明湖和夜晚的曲水亭街是最佳拍照时机。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalRoutes;