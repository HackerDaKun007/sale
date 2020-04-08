-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-04-08 11:22:35
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `sale`
--

-- --------------------------------------------------------

--
-- 表的结构 `sa_about`
--

CREATE TABLE `sa_about` (
  `about_id` int(11) NOT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_about`
--

INSERT INTO `sa_about` (`about_id`, `content`, `create_time`, `update_time`) VALUES
(1, '<h3>关于我们</h3><h4>关于准时抢</h4><ul class=\" list-paddingleft-2\"><li><p>一、准时抢简介</p><p class=\"text\">准时抢（zsqvip.com）是以优质时尚、需求专供为网站定位的大型B2C电子商务购物平台；准时抢商城销售商品类别主要集中个人护肤品，通过向用户表达好东西需要抢购的购物理念，致力于构建国内颇具影响力的定制化综合性购物商城。准时抢商城让每位用户在购物的同时，享受个性化、贴心的服务，以购物需求为前提，让准时抢购物成为个人的商城。我们将为您展示符合您的商品，让购物不再盲从！</p></li><li><p>二、定制化服务，优质供应链</p><p class=\"text\">准时抢商城拥有专业团队专为线上用户购物习惯提供量身定制的线上转销货品，我们定期举行全国各个城市的调查问卷，深层次了解用户购物需求。产品部门将根据统计信息进行货品研发、设计、生产、零售。保障用户购物需求，定制化服务！</p></li><li><p>三、优质服务承诺</p><p class=\"text\">1、正品保障 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;诚信为本，保障正品</p><p class=\"text\">2、全国包邮（港澳台除外） &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;提供全国（港澳台除外）包邮服务，优选快速物流方式。</p><p class=\"text\">3、七天无理由退换货 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;消费者在准时抢平台购物享受七天无理由退换货保障。</p><p class=\"text\">4、十五天温馨售后</p><p class=\"text\">5、全年正常工作日全面服务 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;为消费者提供全年正常工作日优质服务（工作时间：9:00至20:00）</p></li></ul><h4>联系我们</h4><ul class=\" list-paddingleft-2\"><li><p>服务热线：400*******</p></li><li><p>客服邮箱：****@qq.com</p></li><li><p>工作时间： &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;在线客服：正常工作日 9:00至18:00 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;电话热线：正常工作日 9:00至20:00 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;微信客服：正常工作日 准时抢商城客服（二维码）</p></li></ul>', 1585021685, 1585473777);

-- --------------------------------------------------------

--
-- 表的结构 `sa_admin`
--

CREATE TABLE `sa_admin` (
  `admin_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(42) COLLATE utf8_unicode_ci NOT NULL,
  `encrypt` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tei` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `sex` int(11) NOT NULL DEFAULT '1',
  `disable` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_admin`
--

INSERT INTO `sa_admin` (`admin_id`, `role_id`, `username`, `password`, `encrypt`, `create_time`, `update_time`, `name`, `mail`, `tei`, `img`, `sex`, `disable`) VALUES
(6, 1, 'dakun', '2117a982eff4d084c48e86ab2a097dc9', 'JlYUWu6k', 1583711228, 1583830535, '吴坤盛', '1275263021@qq.com', '13760740438', '20200309/6e0df350663de91338a89929748ef4ae.gif', 1, 1),
(23, 6, 'kf_03', '88f61547c4632d3fc852f62003a44554', '081i25kf', 1583828266, 1584434091, '', '', '', '20200310/37cf5cef5046771a749af5e44d1ed6f2.jpg', 1, 1),
(24, 5, '123123', '9be34b8b76f717fdc49643d625b11d6c', 'BzHmEVAW', 1585887615, 1585887625, '123123', '', '', '20200403/79412096b8b60208090d6da0ff703880.jpg', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `sa_adminrecord`
--

CREATE TABLE `sa_adminrecord` (
  `adminrecord_id` int(20) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `ip` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ipaddr` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bro` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `os` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `record_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_adminrecord`
--

INSERT INTO `sa_adminrecord` (`adminrecord_id`, `admin_id`, `ip`, `ipaddr`, `bro`, `os`, `record_time`) VALUES
(5, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1584669477),
(6, 6, '2130706433', '本地局网地址', 'Firefox', 'mac', 1584684424),
(7, 6, '2130706433', '本地局网地址', 'Firefox', 'mac', 1584685058),
(8, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1584757556),
(9, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1584870220),
(10, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1584957493),
(11, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585044400),
(12, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585130842),
(13, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585218854),
(14, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585264936),
(15, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585351455),
(16, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585351516),
(18, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585440594),
(19, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585536436),
(20, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585633893),
(21, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585637471),
(22, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585677040),
(23, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585679320),
(24, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585679347),
(25, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585679386),
(26, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585684175),
(27, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585823518),
(28, 24, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585887645),
(29, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1585889634),
(30, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1586094830),
(31, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1586094849),
(32, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1586274171),
(33, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1586315961),
(34, 6, '2130706433', '本地局网地址', 'Chrome', 'mac', 1586317816);

-- --------------------------------------------------------

--
-- 表的结构 `sa_aftersale`
--

CREATE TABLE `sa_aftersale` (
  `aftersale_id` int(11) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_aftersale`
--

INSERT INTO `sa_aftersale` (`aftersale_id`, `content`, `create_time`, `update_time`) VALUES
(1, '<h3>售后服务</h3><ul class=\" list-paddingleft-2\"><li><h4>一、退换货承诺：</h4><p class=\"li\">准时抢退换货服务三大优势：</p><p class=\"li\">A.自您签收商品之日起7天内，准时抢商城为您提供退换货服务；</p><p class=\"li\">B.退货、换货时质检商品承诺在3个工作日内完成，做到快速质检服务；</p><p class=\"li\">C.退款工作承诺一周工作日内执行完成，做到购物退货退款无顾虑。</p></li><li><h4>二、准时抢退换货服务标准：</h4><p class=\"li\">A.准时抢承诺7天无理由退换货服务（自签收日起7天内）； &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（1）商品不合适可退、换； &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（2）商品款式、颜色等不满意可退、换； &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;（3）商品配送错误可退、换；</p><p class=\"li\">B.7天后准时抢将按照商品规定，为您提供售后三包服务；</p><p class=\"li\">注：图片以及信息仅供参考。因拍摄灯光及不同设备显示等问题可能造成商品图片与实物有一定色差，不属于质量问题，请以实物为准。</p></li><li><h4>三、以下情况将不提供退换货服务：</h4><p class=\"li\">A.任何非准时抢商城正常渠道购买的商品；</p><p class=\"li\">B.超过三包期限的商品；</p><p class=\"li\">C.超过准时抢商城承诺的7天无理由退换货有效时间（产品质量问题除外）；</p><p class=\"li\">D.商品相关附件、保修单、保修卡、吊牌、发票（若开具发票）、赠品等不完整，商品或外包装损坏；</p><p class=\"li\">E.因非正常使用，保养贮存不当，造成的商品损坏（如污损、自行维修、修改加工、洗涤等）；</p></li><li><h4>四、退换货注意事项或相关运费须知：</h4><p class=\"li\">A.商品寄回说明：在与准时抢客服中心确认退换货事宜后，请您务必在24小时内将商品通过快递的方式寄回准时抢售后中心；</p><p class=\"li\">B.寄回商品须知：寄回时需确保商品外包装、内附配件齐全。</p><p class=\"li\">C.商品寄回快递方式说明：准时抢退换货快递费用需由用户垫付给快递公司，拒绝签收到付返回的商品；</p><p class=\"li\">D.退换货退运费说明：订单金额满99元，我们将免运费退换货，订单金额不足99元，我们将从您的退货款中扣除12元以作运费；</p></li></ul>', 1585021685, 1585475178);

-- --------------------------------------------------------

--
-- 表的结构 `sa_carousel`
--

CREATE TABLE `sa_carousel` (
  `carousel_id` int(11) NOT NULL,
  `username` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `url` text COLLATE utf8_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_carousel`
--

INSERT INTO `sa_carousel` (`carousel_id`, `username`, `img`, `url`, `sort`, `create_time`, `update_time`) VALUES
(2, '112', '20200320/2739d196fb87ec3c64fc3d31cc9841d6.jpg', '/admin/index/index.html#/Carousel/index.html', 10, 1584685165, 1584686049),
(3, 'ere', '20200403/d4a0bc1a21b0c9e3844de12049913309.jpg', '#', 10, 1585889667, 1585889667);

-- --------------------------------------------------------

--
-- 表的结构 `sa_category`
--

CREATE TABLE `sa_category` (
  `category_id` int(11) NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_category`
--

INSERT INTO `sa_category` (`category_id`, `username`, `sort`, `create_time`, `update_time`) VALUES
(2, '手机', 10, 1584871583, 1584871583),
(3, '男士化妆品', 10, 1584871592, 1584871592),
(4, '女用化妆品', 10, 1584871603, 1584871603),
(5, '电子设备', 10, 1584871613, 1584871613);

-- --------------------------------------------------------

--
-- 表的结构 `sa_comment`
--

CREATE TABLE `sa_comment` (
  `comment_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `home_img` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `img1` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img2` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img3` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img4` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img5` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img6` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` int(11) NOT NULL,
  `content` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_comment`
--

INSERT INTO `sa_comment` (`comment_id`, `goods_id`, `home_img`, `username`, `img1`, `img2`, `img3`, `img4`, `img5`, `img6`, `date`, `content`, `create_time`, `update_time`) VALUES
(4, 9, '20200329/20e43885dcbca3eb35dc92af35e8bb8e.jpg', '123', '', '', '', '', '', '', 1585461609, '21321', 1585461612, 1585669676);

-- --------------------------------------------------------

--
-- 表的结构 `sa_favorite`
--

CREATE TABLE `sa_favorite` (
  `favorite_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rushdate_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `rushtime_id` int(11) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `orprice` decimal(11,2) NOT NULL,
  `img` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `add_time` int(11) NOT NULL,
  `cancel` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_favorite`
--

INSERT INTO `sa_favorite` (`favorite_id`, `user_id`, `rushdate_id`, `goods_id`, `rushtime_id`, `price`, `orprice`, `img`, `add_time`, `cancel`) VALUES
(1, 10, 6, 8, 18, '3000.00', '50000.00', '20200323/805adbe5e417ebe41da520d1cba0dc1a.jpg', 1585669221, 1),
(2, 10, 7, 9, 19, '100.00', '300.00', '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', 1585678426, 1),
(3, 10, 7, 8, 20, '300.00', '500.00', '20200323/805adbe5e417ebe41da520d1cba0dc1a.jpg', 1585681891, 2);

-- --------------------------------------------------------

--
-- 表的结构 `sa_flowdate`
--

CREATE TABLE `sa_flowdate` (
  `flowdate_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `pv` int(32) NOT NULL,
  `uv` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_flowdate`
--

INSERT INTO `sa_flowdate` (`flowdate_id`, `date`, `pv`, `uv`) VALUES
(7, 1585497600, 10, 2),
(8, 1585584000, 272, 1),
(9, 1585670400, 308, 1),
(10, 1585756800, 10, 1),
(11, 1585843200, 86, 4),
(12, 1585929600, 1, 1),
(13, 1586016000, 44, 1),
(14, 1586102400, 208, 1),
(15, 1586188800, 1, 1),
(16, 1586275200, 31, 1);

-- --------------------------------------------------------

--
-- 表的结构 `sa_goods`
--

CREATE TABLE `sa_goods` (
  `goods_id` int(11) NOT NULL,
  `username` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `home_img` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `payment` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `details` text COLLATE utf8_unicode_ci NOT NULL,
  `styletitle` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `carousel` int(11) DEFAULT '2',
  `style` int(11) DEFAULT '2',
  `shelves` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `freight` decimal(11,2) NOT NULL DEFAULT '0.00',
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_goods`
--

INSERT INTO `sa_goods` (`goods_id`, `username`, `home_img`, `payment`, `details`, `styletitle`, `carousel`, `style`, `shelves`, `category_id`, `freight`, `create_time`, `update_time`) VALUES
(8, '123', '20200323/805adbe5e417ebe41da520d1cba0dc1a.jpg', '1', '<p>123</p>', '11', 1, 1, 1, 2, '0.00', 1584900610, 1585636194),
(9, 'rest', '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', '1', '<p>123</p>', '123', 1, 1, 1, 2, '0.00', 1584900664, 1585679502),
(10, 'test', '20200402/12e9e77bc6a74b5dcd776e8aa6da55a2.gif', '1', '<p><img src=\"/ueditor/php/upload/image/20200402/1585828923948345.jpg\" title=\"1585828923948345.jpg\"/></p><p><img src=\"/ueditor/php/upload/image/20200402/1585828923719238.jpg\" title=\"1585828923719238.jpg\"/></p><p><br/></p>', '类型', 1, 1, 1, 2, '0.00', 1585828927, 1585828947),
(11, 'test', '20200402/7ff0e544223e67843abfb03b27329193.gif', '1', '<p><img src=\"/ueditor/php/upload/image/20200402/1585829207884920.jpg\" title=\"1585829207884920.jpg\"/></p><p><img src=\"/ueditor/php/upload/image/20200402/1585829207819989.jpg\" title=\"1585829207819989.jpg\"/></p><p><br/></p>', '颜色', 1, 1, 1, 2, '0.00', 1585829210, 1585829231),
(12, 'tet', '20200403/2b124e6cd5c7b481dcb7d71a446b2d0d.gif', '1', '<p>sfsd</p>', '555', 1, 1, 1, 2, '0.00', 1585889695, 1585889735);

-- --------------------------------------------------------

--
-- 表的结构 `sa_goodscarousel`
--

CREATE TABLE `sa_goodscarousel` (
  `goodscarousel_id` int(11) NOT NULL,
  `img` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `goods_id` int(11) NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_goodscarousel`
--

INSERT INTO `sa_goodscarousel` (`goodscarousel_id`, `img`, `goods_id`, `sort`) VALUES
(1, '20200324/3caabf0f2e926201371391ad7e29d2ac.jpg', 8, 1),
(2, '20200324/11cc2651958f8480ae37d2c66ef797e9.jpg', 9, 1),
(3, '20200402/d543b5bfcd7cd4f732b42884f8db94f6.jpg', 10, 1),
(4, '20200402/bb9af68d541ad0fd323fd5cc4f6236e4.jpg', 11, 1),
(5, '20200402/bb9af68d541ad0fd323fd5cc4f6236e4.jpg', 11, 1),
(6, '20200403/f571b99c8f4a33ecdb5c3b1c72c384a9.jpg', 12, 1),
(7, '20200403/7b08c914002c54a09116b5d734593c98.jpg', 12, 1);

-- --------------------------------------------------------

--
-- 表的结构 `sa_goodsstyle`
--

CREATE TABLE `sa_goodsstyle` (
  `goodsstyle_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `regular_price` decimal(11,2) NOT NULL,
  `available` int(11) NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_goodsstyle`
--

INSERT INTO `sa_goodsstyle` (`goodsstyle_id`, `goods_id`, `username`, `price`, `regular_price`, `available`, `sort`) VALUES
(1, 9, '红款', '100.00', '300.00', 2000, 10),
(2, 9, '绿卡', '300.00', '500.00', 2000, 10),
(3, 9, '绿卡2号', '300.00', '500.00', 2000, 10),
(4, 8, '1号测试剂', '3000.00', '50000.00', 2000, 10),
(5, 8, '2号测试', '300.00', '5000.00', 2000, 10),
(6, 10, '001', '100.00', '1000.00', 2000, 10),
(7, 11, '001', '100.00', '1000.00', 2000, 10),
(8, 12, '44', '123.00', '11111.00', 2000, 10);

-- --------------------------------------------------------

--
-- 表的结构 `sa_homeclick`
--

CREATE TABLE `sa_homeclick` (
  `homeclick_id` int(11) NOT NULL,
  `homedate_id` int(11) NOT NULL,
  `ip` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `ipadder` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  `addtime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `sa_homedate`
--

CREATE TABLE `sa_homedate` (
  `homedate_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- 表的结构 `sa_order`
--

CREATE TABLE `sa_order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment` int(11) NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tel` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `area` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `adder` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_user` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `goods_style` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  `freight` decimal(11,2) NOT NULL,
  `order_status` int(11) NOT NULL,
  `express` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `express_number` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order_number` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_back` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `os_back` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ip` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ipadder` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zoprice` decimal(11,2) NOT NULL,
  `time` int(11) NOT NULL,
  `img` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_order`
--

INSERT INTO `sa_order` (`order_id`, `user_id`, `payment`, `username`, `tel`, `area`, `adder`, `goods_id`, `goods_user`, `price`, `goods_style`, `number`, `freight`, `order_status`, `express`, `express_number`, `order_number`, `user_back`, `os_back`, `ip`, `ipadder`, `zoprice`, `time`, `img`, `create_time`, `update_time`) VALUES
(26, 10, 1, 'dakun1', '13760740439', '河南省 许昌市 襄城县', 'ff', 9, 'dasd', '100.00', '红款', 2, '0.00', 2, '1', '1', '71721373', '1', 'fffss', '2130706433', '本地局网地址', '200.00', 1585584000, '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', 1585636497, 1585644041),
(30, 10, 1, 'dakun', '13760740438', '河南省许昌市襄城县', '123', 8, '123', '300.00', '2号测试', 1, '0.00', 1, '尚未有快递公司', '无', '79802313', '', NULL, '2130706433', '本地局网地址', '300.00', 1585670400, '20200323/805adbe5e417ebe41da520d1cba0dc1a.jpg', 1585678701, 1585678701),
(31, 10, 1, 'dakun', '13760740438', '河南省许昌市襄城县', '123', 8, '123', '300.00', '2号测试', 1, '0.00', 1, '尚未有快递公司', '无', '14029746', '', NULL, '2130706433', '本地局网地址', '300.00', 1585670400, '20200323/805adbe5e417ebe41da520d1cba0dc1a.jpg', 1585678779, 1585678779),
(32, 10, 1, 'dakun', '13760740438', '河南省许昌市襄城县', '123', 8, '123', '300.00', '2号测试', 1, '0.00', 1, '尚未有快递公司', '无', '47862291', '', NULL, '2130706433', '本地局网地址', '300.00', 1585670400, '20200323/805adbe5e417ebe41da520d1cba0dc1a.jpg', 1585678799, 1585678799),
(33, 10, 1, 'dakun', '13760740438', '河南省许昌市襄城县', '123', 8, '123', '3000.00', '1号测试剂', 1, '0.00', 1, '尚未有快递公司', '无', '28136271', '', NULL, '2130706433', '本地局网地址', '3000.00', 1585670400, '20200323/805adbe5e417ebe41da520d1cba0dc1a.jpg', 1585678933, 1585678933),
(34, 10, 1, 'dakun', '13760740438', '河南省许昌市襄城县', '123', 9, 'dasd', '100.00', '红款', 1, '0.00', 1, '尚未有快递公司', '无', '96237447', '', NULL, '2130706433', '本地局网地址', '100.00', 1585670400, '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', 1585678944, 1585678944),
(35, 10, 1, 'dakun', '13760740438', '河南省许昌市襄城县', '123', 9, 'dasd', '100.00', '红款', 1, '0.00', 1, '尚未有快递公司', '无', '71334381', '', NULL, '2130706433', '本地局网地址', '100.00', 1585670400, '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', 1585678959, 1585678959),
(36, 10, 1, 'dakun', '13760740438', '河南省许昌市襄城县', '123', 9, 'rest', '300.00', '绿卡2号', 2, '0.00', 1, '尚未有快递公司', '无', '89301816', '', NULL, '2130706433', '本地局网地址', '600.00', 1585670400, '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', 1585679541, 1585679541),
(37, 10, 1, 'dakun', '13760740438', '河南省许昌市襄城县', '123', 9, 'rest', '100.00', '红款', 1, '0.00', 1, '尚未有快递公司', '无', '32751035', '', NULL, '2130706433', '本地局网地址', '100.00', 1585670400, '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', 1585679564, 1585679564),
(38, 32, 1, 'dakun', '13760740438', '河南省 许昌市 襄城县', '1232131231', 9, 'rest', '100.00', '红款', 2, '0.00', 1, '尚未有快递公司', '无', '67315852', '', NULL, '2130706433', '本地局网地址', '200.00', 1585670400, '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', 1585684522, 1585684522),
(39, 33, 1, '123', '13760740438', '河南省 许昌市 襄城县', '231231', 9, 'rest', '300.00', '绿卡', 2, '0.00', 1, '尚未有快递公司', '无', '84482984', 'ssss', NULL, '2130706433', '本地局网地址', '600.00', 1585670400, '20200323/df72e1a4067436d089bd51f5ac58e750.jpg', 1585684686, 1585684686),
(40, 38, 1, 'dakun', '13760740438', '河南省 许昌市 襄城县', '123', 11, 'test', '100.00', '001', 1, '0.00', 1, '尚未有快递公司', '无', '65972253', '', NULL, '2130706433', '本地局网地址', '100.00', 1585843200, '20200402/7ff0e544223e67843abfb03b27329193.gif', 1585848800, 1585848800),
(41, 38, 1, 'dakun', '13760740438', '河南省 许昌市 襄城县', '123', 12, 'tet', '123.00', '44', 1, '0.00', 1, '尚未有快递公司', '无', '19731579', 'ww', NULL, '2130706433', '本地局网地址', '123.00', 1585843200, '20200403/2b124e6cd5c7b481dcb7d71a446b2d0d.gif', 1585889801, 1585889801);

-- --------------------------------------------------------

--
-- 表的结构 `sa_power`
--

CREATE TABLE `sa_power` (
  `power_id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `whether` int(11) NOT NULL DEFAULT '1',
  `grade` int(11) NOT NULL,
  `level` int(11) DEFAULT '0',
  `controller` varchar(50) COLLATE utf8_unicode_ci DEFAULT '0',
  `method` varchar(50) COLLATE utf8_unicode_ci DEFAULT '0',
  `url` varchar(150) COLLATE utf8_unicode_ci DEFAULT '0',
  `sort` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_power`
--

INSERT INTO `sa_power` (`power_id`, `username`, `whether`, `grade`, `level`, `controller`, `method`, `url`, `sort`, `create_time`, `update_time`) VALUES
(12, '系统用户列表', 1, 1, 0, '', '', '0', 10, 1583464554, 1583603225),
(13, '权限列表', 1, 2, 12, 'Power', 'index', 'Power/index', 100, 1583464597, 1583603089),
(14, '添加', 2, 3, 13, 'Power', 'add', 'Power/add', 10, 1583464613, 1583603086),
(15, '修改', 2, 3, 13, 'Power', 'edit', 'Power/edit', 9, 1583464633, 1583603082),
(16, '删除', 2, 3, 13, 'Power', 'del', 'Power/del', 8, 1583464651, 1583603079),
(17, '首页', 1, 1, 0, 'Index', 'home', 'Index/home', 100, 1583601867, 1583603319),
(18, '角色列表', 1, 2, 12, 'Role', 'index', 'Role/index', 99, 1583636801, 1583636801),
(19, '添加', 2, 3, 18, 'Role', 'add', 'Role/add', 10, 1583636849, 1583636849),
(20, '修改', 2, 3, 18, 'Role', 'edit', 'Role/edit', 9, 1583636870, 1583636870),
(21, '删除', 2, 3, 18, 'Role', 'del', 'Role/del', 8, 1583636886, 1583636886),
(22, '管理员列表', 1, 2, 12, 'Admin', 'index', 'Admin/index', 98, 1583672755, 1583672755),
(23, '添加', 2, 3, 22, 'Admin', 'add', 'Admin/add', 10, 1583672872, 1583672872),
(24, '修改', 2, 3, 22, 'Admin', 'edit', 'Admin/edit', 9, 1583672905, 1583672905),
(25, '删除', 2, 3, 22, 'Admin', 'del', 'Admin/del', 8, 1583672926, 1583672926),
(37, '修改', 2, 3, 35, 'Hot', 'edit', 'Hot/edit', 10, 1584323049, 1584323049),
(38, '删除', 2, 3, 35, 'Hot', 'del', 'Hot/del', 10, 1584323062, 1584323062),
(39, '网站信息记录', 1, 1, 0, '', '', '0', 10, 1584440019, 1584440019),
(40, '管理员登陆记录', 1, 2, 39, 'Adminrecord', 'index', 'Adminrecord/index', 10, 1584440048, 1584440048),
(41, '删除', 2, 3, 40, 'Adminrecord', 'del', 'Adminrecord/del', 10, 1584603605, 1584603605),
(42, '产品首页轮播图', 1, 1, 0, 'Carousel', 'index', 'Carousel/index', 98, 1584671796, 1585350908),
(43, '添加', 2, 2, 42, 'Carousel', 'add', 'Carousel/add', 10, 1584671852, 1584671852),
(44, '修改', 2, 2, 42, 'Carousel', 'edit', 'Carousel/edit', 10, 1584671874, 1584671874),
(45, '删除', 2, 2, 42, 'Carousel', 'del', 'Carousel/del', 10, 1584671887, 1584671887),
(46, '产品栏目', 1, 1, 0, '', '', '0', 98, 1584678068, 1584678068),
(47, '服务说明', 1, 2, 46, 'Service', 'index', 'Service/index', 50, 1584684702, 1584684702),
(48, '产品列表', 1, 2, 46, 'Goods', 'index', 'Goods/index', 10, 1584777349, 1584777349),
(49, '添加', 2, 3, 48, 'Goods', 'add', 'Goods/add', 10, 1584777365, 1584777365),
(50, '修改', 2, 3, 48, 'Goods', 'edit', 'Goods/edit', 10, 1584777376, 1584777376),
(51, '删除', 2, 3, 48, 'Goods', 'del', 'Goods/del', 10, 1584777387, 1584777387),
(52, '产品类别', 1, 2, 46, 'Category', 'index', 'Category/index', 100, 1584870266, 1584870266),
(53, '添加', 2, 3, 52, 'Category', 'add', 'Category/add', 10, 1584870292, 1584870292),
(54, '修改', 2, 3, 52, 'Category', 'edit', 'Category/edit', 10, 1584870304, 1584870304),
(55, '删除', 2, 3, 52, 'Category', 'del', 'Category/del', 10, 1584870315, 1584870315),
(56, '轮播图展示', 2, 3, 48, 'Goodscarousel', 'index', 'Goodscarousel/index', 10, 1584892410, 1584892410),
(57, '轮播图添加', 2, 3, 48, 'Goodscarousel', 'add', 'Goodscarousel/add', 10, 1584892432, 1584892432),
(58, '轮播图修改', 2, 3, 48, 'Goodscarousel', 'edit', 'Goodscarousel/edit', 10, 1584892457, 1584892457),
(59, '轮播图删除', 2, 3, 48, 'Goodscarousel', 'del', 'Goodscarousel/del', 10, 1584892471, 1584892471),
(60, '产品款式', 2, 3, 48, 'Goodsstyle', 'index', 'Goodsstyle/index', 10, 1584930870, 1584930870),
(61, '产品款式-添加', 2, 3, 48, 'Goodsstyle', 'add', 'Goodsstyle/add', 10, 1584930888, 1584930888),
(62, '产品款式-修改', 2, 3, 48, 'Goodsstyle', 'edit', 'Goodsstyle/edit', 10, 1584930905, 1584930905),
(63, '产品款式-删除', 2, 3, 48, 'Goodsstyle', 'del', 'Goodsstyle/del', 10, 1584930922, 1584930922),
(64, '抢购栏目', 1, 1, 0, '', '', '0', 97, 1584931929, 1584931929),
(65, '抢购日期', 1, 2, 64, 'Rushdate', 'index', 'Rushdate/index', 10, 1584931975, 1584931975),
(66, '添加', 2, 3, 65, 'Rushdate', 'add', 'Rushdate/add', 10, 1584931992, 1584931992),
(67, '修改', 2, 3, 65, 'Rushdate', 'edit', 'Rushdate/edit', 10, 1584932003, 1584932003),
(68, '删除', 2, 3, 65, 'Rushdate', 'del', 'Rushdate/del', 10, 1584932014, 1584932014),
(69, '抢购时间', 1, 2, 64, 'Rushtime', 'index', 'Rushtime/index', 10, 1584945599, 1584945599),
(70, '添加', 2, 3, 69, 'Rushtime', 'add', 'Rushtime/add', 10, 1584945614, 1584945614),
(71, '修改', 2, 3, 69, 'Rushtime', 'edit', 'Rushtime/edit', 10, 1584945626, 1584945626),
(72, '删除', 2, 3, 69, 'Rushtime', 'del', 'Rushtime/del', 10, 1584945639, 1584945639),
(73, '抢购商品', 1, 2, 64, 'Rushgoods', 'index', 'Rushgoods/index', 10, 1584959315, 1584959315),
(74, '添加', 2, 3, 73, 'Rushgoods', 'add', 'Rushgoods/add', 10, 1584959327, 1584959327),
(75, '修改', 2, 3, 73, 'Rushgoods', 'edit', 'Rushgoods/edit', 10, 1584959363, 1584959363),
(76, '删除', 2, 3, 73, 'Rushgoods', 'del', 'Rushgoods/del', 10, 1584959373, 1584959373),
(77, '更新缓存', 2, 3, 73, 'Rushgoods', 'uploadcache', 'Rushgoods/uploadcache', 10, 1585043843, 1585043843),
(78, '推荐抢购商品', 1, 2, 64, 'Recogoods', 'index', 'Recogoods/index', 10, 1585102799, 1585102799),
(79, '添加', 2, 3, 78, 'Recogoods', 'add', 'Recogoods/add', 10, 1585102827, 1585102827),
(80, '修改', 2, 3, 78, 'Recogoods', 'edit', 'Recogoods/edit', 10, 1585102865, 1585102865),
(81, '删除', 2, 3, 78, 'Recogoods', 'del', 'Recogoods/del', 10, 1585102875, 1585102875),
(82, '更新缓存', 2, 3, 78, 'Recogoods', 'uploadcache', 'Recogoods/uploadcache', 10, 1585113468, 1585113468),
(83, '参数列表', 2, 3, 48, 'Rarameter', 'index', 'Rarameter/index', 10, 1585115209, 1585115209),
(84, '参数添加', 2, 3, 48, 'Rarameter', 'add', 'Rarameter/add', 10, 1585115225, 1585115225),
(85, '参数修改', 2, 3, 48, 'Rarameter', 'edit', 'Rarameter/edit', 10, 1585115238, 1585115238),
(86, '参数删除', 2, 3, 48, 'Rarameter', 'del', 'Rarameter/del', 10, 1585115249, 1585115249),
(87, '用户栏目', 1, 1, 0, '', '', '0', 90, 1585132002, 1585132036),
(88, '用户信息', 1, 2, 87, 'User', 'index', 'User/index', 10, 1585135254, 1585135254),
(89, '添加', 2, 3, 88, 'User', 'add', 'User/add', 10, 1585135272, 1585135272),
(90, '修改密码', 2, 3, 18, 'User', 'editpassw', 'User/editpassw', 10, 1585135294, 1585135294),
(91, '删除', 2, 3, 88, 'User', 'del', 'User/del', 10, 1585135305, 1585135305),
(92, '用户登陆记录', 1, 2, 87, 'Userlogin', 'index', 'Userlogin/index', 8, 1585202606, 1585202606),
(93, '用户收藏记录', 1, 2, 87, 'Favorite', 'index', 'Favorite/index', 10, 1585218942, 1585218942),
(94, '用户收货地址', 1, 2, 87, 'Useraddress', 'index', 'Useraddress/index', 10, 1585264899, 1585264899),
(95, '订单状态', 1, 1, 0, 'Order', 'index', 'Order/index', 99, 1585281599, 1585350888),
(96, '客服微信', 1, 1, 0, 'Vx', 'index', 'Vx/index', 99, 1585350956, 1585350956),
(97, '添加', 2, 2, 96, 'Vx', 'add', 'Vx/add', 10, 1585350986, 1585350986),
(98, '修改', 2, 2, 96, 'Vx', 'edit', 'Vx/edit', 10, 1585351005, 1585351005),
(99, '删除', 2, 2, 96, 'Vx', 'del', 'Vx/del', 10, 1585351018, 1585351018),
(100, '网站设置', 1, 1, 0, '', '', '0', 15, 1585408563, 1585408563),
(101, '关于我们', 1, 2, 100, 'About', 'index', 'About/index', 10, 1585408701, 1585408701),
(102, '修改', 2, 3, 101, 'About', 'edit', 'About/edit', 10, 1585421573, 1585421573),
(103, '售后服务说明', 1, 2, 100, 'Aftersale', 'index', 'Aftersale/index', 10, 1585421621, 1585421621),
(104, '修改', 2, 3, 103, 'Aftersale', 'edit', 'Aftersale/edit', 10, 1585421634, 1585421634),
(105, '网站相关设置', 1, 2, 100, 'Web', 'index', 'Web/index', 10, 1585441285, 1585441285),
(106, '修改', 2, 3, 105, 'Web', 'edit', 'Web/edit', 10, 1585441302, 1585441302),
(107, '评论列表', 1, 2, 46, 'Comment', 'index', 'Comment/index', 10, 1585451044, 1585451044),
(108, '添加', 2, 3, 107, 'Comment', 'add', 'Comment/add', 10, 1585451077, 1585451077),
(109, '修改', 2, 3, 107, 'Comment', 'edit', 'Comment/edit', 10, 1585451104, 1585451104),
(110, '删除', 2, 3, 107, 'Comment', 'del', 'Comment/del', 10, 1585451123, 1585451123),
(111, '流量统计', 1, 1, 0, '', '', '0', 10, 1585567627, 1585567627),
(112, 'pv', 1, 2, 111, 'Flowdate', 'index', 'Flowdate/index', 10, 1585567658, 1585567658),
(113, '查看详情', 2, 3, 112, 'Flowdate', 'pv', 'Flowdate/pv', 10, 1585583490, 1585583490),
(114, 'Uv', 1, 2, 111, 'Flowdate', 'uvindex', 'Flowdate/uvindex', 10, 1585583502, 1585583502),
(115, '查看详情', 2, 3, 114, 'Flowdate', 'uv', 'Flowdate/uv', 10, 1585583523, 1585583523),
(116, '更新缓存', 2, 2, 95, 'Order', 'uploadselect', 'Order/uploadselect', 10, 1585677751, 1585677751),
(117, '首页点击pv', 1, 2, 111, 'Homedate', 'index', 'Homedate/index', 10, 1586336652, 1586336652),
(118, '详情', 2, 3, 117, 'Homedate', 'homeclick', 'Homedate/homeclick', 10, 1586336683, 1586336683);

-- --------------------------------------------------------

--
-- 表的结构 `sa_pv`
--

CREATE TABLE `sa_pv` (
  `pv_id` int(11) NOT NULL,
  `flowdate_id` int(11) NOT NULL,
  `url` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `ip` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `ipadder` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `num` int(11) NOT NULL,
  `addtime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_pv`
--

INSERT INTO `sa_pv` (`pv_id`, `flowdate_id`, `url`, `ip`, `ipadder`, `num`, `addtime`) VALUES
(9, 7, '/', '3232235704', '局域网 对方和您在同一内部网', 5, 1585566998),
(10, 7, '/home/mine/mine.html?i123&123', '2130706433', '本地局网地址', 4, 1585567006),
(11, 7, '/', '2130706433', '本地局网地址', 1, 1585569410),
(12, 8, '/', '2130706433', '本地局网地址', 38, 1585586594),
(13, 8, '/home/mine/mine.html', '2130706433', '本地局网地址', 10, 1585586597),
(14, 8, '/home/order/myorder.html', '2130706433', '本地局网地址', 4, 1585586598),
(15, 8, '/home/mine/aboutus.html', '2130706433', '本地局网地址', 1, 1585586603),
(16, 8, '/home/manage/manage.html', '2130706433', '本地局网地址', 2, 1585586612),
(17, 8, '/home/goods/goodsdetail.html?id=9&date_id=6&time_id=15', '2130706433', '本地局网地址', 1, 1585586763),
(18, 8, '/home/goods/20200323/df72e1a4067436d089bd51f5ac58e750.jpg', '2130706433', '本地局网地址', 1, 1585586764),
(19, 8, '/home/goods/20200329/d37d980564da04ba9f55949db2b320ef.jpg', '2130706433', '本地局网地址', 1, 1585586764),
(20, 8, '/home/goods/20200324/11cc2651958f8480ae37d2c66ef797e9.jpg', '2130706433', '本地局网地址', 1, 1585586764),
(21, 8, '/home/goods/undefined', '2130706433', '本地局网地址', 10, 1585586770),
(22, 8, '/home/order/order.html?id=9&date_id=6&time_id=15&goodsstyle_id=3&num=2', '2130706433', '本地局网地址', 72, 1585586775),
(23, 8, '/home/order/20200323/df72e1a4067436d089bd51f5ac58e750.jpg', '2130706433', '本地局网地址', 70, 1585586775),
(24, 8, '/home/order/addorder.html', '2130706433', '本地局网地址', 10, 1585586795),
(25, 8, '/home/order/order.html?id=9&date_id=6&time_id=15&goodsstyle_id=3&num=2fsdfsdfdfdsfdsfdfsfs', '2130706433', '本地局网地址', 2, 1585587008),
(26, 8, '/', '2130706433', '本地局网地址', 35, 1585619135),
(27, 8, '/home/goods/goodsdetail.html?id=9&date_id=6&time_id=15', '2130706433', '本地局网地址', 9, 1585619251),
(28, 8, '/home/goods/20200324/11cc2651958f8480ae37d2c66ef797e9.jpg', '2130706433', '本地局网地址', 3, 1585619251),
(29, 8, '/home/goods/20200323/df72e1a4067436d089bd51f5ac58e750.jpg', '2130706433', '本地局网地址', 2, 1585619252),
(30, 8, '/home/goods/20200329/d37d980564da04ba9f55949db2b320ef.jpg', '2130706433', '本地局网地址', 4, 1585619252),
(31, 8, '/home/order/order.html?id=9&date_id=6&time_id=15&goodsstyle_id=1&num=1', '2130706433', '本地局网地址', 3, 1585619315),
(32, 8, '/home/order/20200323/df72e1a4067436d089bd51f5ac58e750.jpg', '2130706433', '本地局网地址', 3, 1585619315),
(33, 8, '/home/order/addorder.html', '2130706433', '本地局网地址', 107, 1585619317),
(34, 8, '/home/goods/goodsdetail.html?id=8&date_id=6&time_id=14', '2130706433', '本地局网地址', 10, 1585620160),
(35, 8, '/home/order/order.html?id=8&date_id=6&time_id=14&goodsstyle_id=5&num=3', '2130706433', '本地局网地址', 3, 1585620203),
(36, 8, '/home/order/20200323/805adbe5e417ebe41da520d1cba0dc1a.jpg', '2130706433', '本地局网地址', 1, 1585620204),
(37, 8, '/home/goods/goodsdetail.html?id=9&date_id=6&time_id=14', '2130706433', '本地局网地址', 3, 1585620508),
(38, 8, '/home/order/order.html?id=9&date_id=6&time_id=14&goodsstyle_id=2&num=1', '2130706433', '本地局网地址', 1, 1585620535),
(39, 8, '/home/order/order.html?id=8&date_id=6&time_id=14&goodsstyle_id=4&num=1', '2130706433', '本地局网地址', 13, 1585620869),
(40, 8, '/home/order/order.html?id=9&date_id=6&time_id=14&goodsstyle_id=1&num=1', '2130706433', '本地局网地址', 1, 1585622638),
(41, 8, '/home/mine/mine.html', '2130706433', '本地局网地址', 2, 1585623566),
(42, 8, '/home/mine/myaddress.html', '2130706433', '本地局网地址', 7, 1585623569),
(43, 8, '/home/mine/editaddress.html?id=6', '2130706433', '本地局网地址', 3, 1585623570),
(44, 8, '/home/mine/addader.html', '2130706433', '本地局网地址', 1, 1585623574),
(45, 8, '/home/mine/editaddress.html?id=5', '2130706433', '本地局网地址', 1, 1585623592),
(46, 8, '/home/goods/goodsdetail.html?id=8&date_id=6&time_id=13', '2130706433', '本地局网地址', 7, 1585623864),
(47, 8, '/home/order/order.html?id=8&date_id=6&time_id=13&goodsstyle_id=4&num=1', '2130706433', '本地局网地址', 17, 1585623867),
(48, 8, '/home/goods/goodsdetail.html?id=9&date_id=6&time_id=13', '2130706433', '本地局网地址', 2, 1585626566),
(49, 8, '/home/order/order.html?id=9&date_id=6&time_id=13&goodsstyle_id=1&num=1', '2130706433', '本地局网地址', 2, 1585626568),
(50, 8, '/home/order/orderconfirm.html?id=G28NdIf%3D139H6', '2130706433', '本地局网地址', 10, 1585626598),
(51, 8, '/home/order/orderconfirm.html?id=FEpyiy5abDga1', '2130706433', '本地局网地址', 1, 1585627064),
(52, 8, '/home/order/orderdetail.html?id=FEpyiy5abDga1', '2130706433', '本地局网地址', 1, 1585627088),
(53, 8, '/home/order/orderconfirm.html?id=ueBnVunhbcjoe', '2130706433', '本地局网地址', 1, 1585627134),
(54, 8, '/home/order/orderdetail.html?id=ueBnVunhbcjoe', '2130706433', '本地局网地址', 28, 1585627135),
(55, 8, '/home/goods/goodsdetail.html?id=8&date_id=6&time_id=16', '2130706433', '本地局网地址', 21, 1585633949),
(56, 8, '/home/goods/goodsdetail.html?id=9&date_id=6&time_id=17', '2130706433', '本地局网地址', 1, 1585636272),
(57, 8, '/home/order/order.html?id=9&date_id=6&time_id=17&goodsstyle_id=1&num=1', '2130706433', '本地局网地址', 1, 1585636278),
(58, 8, '/home/order/orderconfirm.html?id=%3Du2pq%3DiDqxIAg', '2130706433', '本地局网地址', 1, 1585636349),
(59, 8, '/home/order/orderconfirm.html?id=PV447TXE0C1BF', '2130706433', '本地局网地址', 1, 1585636497),
(60, 8, '/home/order/orderdetail.html?id=PV447TXE0C1BF', '2130706433', '本地局网地址', 1, 1585636499),
(61, 8, '/home/mine/mycollect.html', '2130706433', '本地局网地址', 7, 1585649480),
(62, 8, '/home/goods/goodsdetail.html?id=8&date_id=6&time_id=18', '2130706433', '本地局网地址', 2, 1585669218),
(63, 8, '/home/goods/favorite.html', '2130706433', '本地局网地址', 1, 1585669221),
(64, 9, '/', '2130706433', '本地局网地址', 56, 1585670400),
(65, 9, '/home/mine/mine.html', '2130706433', '本地局网地址', 17, 1585674630),
(66, 9, '/home/mine/mycollect.html', '2130706433', '本地局网地址', 57, 1585674631),
(67, 9, '/home/order/myorder.html', '2130706433', '本地局网地址', 10, 1585674693),
(68, 9, '/home/mine/aftersale.html', '2130706433', '本地局网地址', 2, 1585675629),
(69, 9, '/home/mine/aboutus.html', '2130706433', '本地局网地址', 1, 1585675647),
(70, 9, '/home/goods/goodsdetail.html?id=8&date_id=7&time_id=19', '2130706433', '本地局网地址', 4, 1585678367),
(71, 9, '/home/goods/goodsdetail.html?id=9&date_id=7&time_id=19', '2130706433', '本地局网地址', 9, 1585678410),
(72, 9, '/home/goods/favorite.html', '2130706433', '本地局网地址', 3, 1585678425),
(73, 9, '/home/order/order.html?id=8&date_id=7&time_id=19&goodsstyle_id=5&num=1', '2130706433', '本地局网地址', 4, 1585678534),
(74, 9, '/home/order/addorder.html', '2130706433', '本地局网地址', 28, 1585678541),
(75, 9, '/home/order/orderconfirm.html?id=41459147', '2130706433', '本地局网地址', 1, 1585678541),
(76, 9, '/home/order/orderconfirm.html?id=77915518', '2130706433', '本地局网地址', 1, 1585678565),
(77, 9, '/home/order/orderconfirm.html?id=47862291', '2130706433', '本地局网地址', 5, 1585678799),
(78, 9, '/home/order/orderdetail.html?id=47862291', '2130706433', '本地局网地址', 1, 1585678893),
(79, 9, '/home/order/order.html?id=8&date_id=7&time_id=19&goodsstyle_id=4&num=1', '2130706433', '本地局网地址', 1, 1585678931),
(80, 9, '/home/order/orderconfirm.html?id=28136271', '2130706433', '本地局网地址', 1, 1585678934),
(81, 9, '/home/order/order.html?id=9&date_id=7&time_id=19&goodsstyle_id=1&num=1', '2130706433', '本地局网地址', 4, 1585678943),
(82, 9, '/home/order/orderconfirm.html?id=96237447', '2130706433', '本地局网地址', 1, 1585678944),
(83, 9, '/home/order/orderconfirm.html?id=71334381', '2130706433', '本地局网地址', 1, 1585678959),
(84, 9, '/home/order/order.html?id=9&date_id=7&time_id=19&goodsstyle_id=3&num=2', '2130706433', '本地局网地址', 1, 1585679540),
(85, 9, '/home/order/orderconfirm.html?id=89301816', '2130706433', '本地局网地址', 1, 1585679541),
(86, 9, '/home/order/orderconfirm.html?id=32751035', '2130706433', '本地局网地址', 1, 1585679564),
(87, 9, '/home/mine/myaddress.html', '2130706433', '本地局网地址', 20, 1585679602),
(88, 9, '/home/mine/editaddress.html?id=7', '2130706433', '本地局网地址', 1, 1585679603),
(89, 9, '/home/mine/deladder.html', '2130706433', '本地局网地址', 2, 1585679605),
(90, 9, '/home/mine/addader.html', '2130706433', '本地局网地址', 5, 1585679621),
(91, 9, '/home/mine/editaddress.html?id=8', '2130706433', '本地局网地址', 1, 1585679639),
(92, 9, '/home/mine/editaddress.html?id=9', '2130706433', '本地局网地址', 13, 1585679945),
(93, 9, '/home/mine/editaddress.html?id=10', '2130706433', '本地局网地址', 13, 1585679953),
(94, 9, '/home/goods/goodsdetail.html?id=8&date_id=6&time_id=18', '2130706433', '本地局网地址', 6, 1585681582),
(95, 9, '/home/goods/goodsdetail.html?id=9&date_id=7&time_id=20', '2130706433', '本地局网地址', 8, 1585681878),
(96, 9, '/home/goods/goodsdetail.html?id=8&date_id=7&time_id=20', '2130706433', '本地局网地址', 11, 1585681882),
(97, 9, '/home/order/order.html?id=9&date_id=7&time_id=20&goodsstyle_id=1&num=1', '2130706433', '本地局网地址', 3, 1585682532),
(98, 9, '/home/order/order.html?id=8&date_id=7&time_id=20&goodsstyle_id=4&num=1', '2130706433', '本地局网地址', 8, 1585683220),
(99, 9, '/home/order/order.html?id=9&date_id=7&time_id=20&goodsstyle_id=1&num=2', '2130706433', '本地局网地址', 2, 1585684490),
(100, 9, '/home/order/orderconfirm.html?id=67315852', '2130706433', '本地局网地址', 1, 1585684522),
(101, 9, '/home/order/orderdetail.html?id=67315852', '2130706433', '本地局网地址', 1, 1585684524),
(102, 9, '/home/order/order.html?id=9&date_id=7&time_id=20&goodsstyle_id=2&num=1', '2130706433', '本地局网地址', 1, 1585684672),
(103, 9, '/home/order/orderconfirm.html?id=84482984', '2130706433', '本地局网地址', 1, 1585684687),
(104, 9, '/home/order/orderdetail.html?id=84482984', '2130706433', '本地局网地址', 1, 1585684755),
(105, 10, '/', '2130706433', '本地局网地址', 6, 1585797202),
(106, 10, '/home/mine/mine.html', '2130706433', '本地局网地址', 5, 1585797220),
(107, 10, '/home/order/myorder.html', '2130706433', '本地局网地址', 1, 1585797221),
(108, 10, '/home/mine/aboutus.html', '2130706433', '本地局网地址', 1, 1585797225),
(109, 11, '/', '2130706433', '本地局网地址', 38, 1585848784),
(110, 11, '/home/goods/goodsdetail.html?id=11&date_id=9&time_id=24', '2130706433', '本地局网地址', 1, 1585848789),
(111, 11, '/home/order/order.html?id=11&date_id=9&time_id=24&goodsstyle_id=7&num=1', '2130706433', '本地局网地址', 1, 1585848792),
(112, 11, '/home/order/addorder.html', '2130706433', '本地局网地址', 2, 1585848800),
(113, 11, '/home/order/orderconfirm.html?id=65972253', '2130706433', '本地局网地址', 1, 1585848800),
(114, 11, '/home/order/orderdetail.html?id=65972253', '2130706433', '本地局网地址', 2, 1585848941),
(115, 11, '/home/mine/mine.html', '2130706433', '本地局网地址', 8, 1585848945),
(116, 11, '/home/order/myorder.html', '2130706433', '本地局网地址', 1, 1585848947),
(117, 11, '/home/mine/myaddress.html', '2130706433', '本地局网地址', 1, 1585886282),
(118, 11, '/home/mine/editaddress.html?id=13', '2130706433', '本地局网地址', 8, 1585886283),
(119, 11, '/home/goods/goodsdetail.html?id=12&date_id=9&time_id=25', '2130706433', '本地局网地址', 1, 1585889795),
(120, 11, '/home/order/order.html?id=12&date_id=9&time_id=25&goodsstyle_id=8&num=1', '2130706433', '本地局网地址', 1, 1585889798),
(121, 11, '/home/order/orderconfirm.html?id=19731579', '2130706433', '本地局网地址', 1, 1585889801),
(122, 11, '/home/goods/goodsdetail.html?id=12&date_id=9&time_id=26', '2130706433', '本地局网地址', 7, 1585902200),
(123, 11, '/', '3232235704', '局域网 对方和您在同一内部网', 7, 1585909670),
(124, 11, '/', '3232235691', '局域网 对方和您在同一内部网', 5, 1585909690),
(125, 11, '/', '3232235637', '局域网 对方和您在同一内部网', 1, 1585910450),
(126, 12, '/', '3232235694', '局域网 对方和您在同一内部网', 1, 1585988186),
(127, 13, '/', '2130706433', '本地局网地址', 40, 1586096961),
(128, 13, '/home/goods/goodsdetail.html?id=12&date_id=10&time_id=27', '2130706433', '本地局网地址', 1, 1586098777),
(129, 13, '/home/order/order.html?id=12&date_id=10&time_id=27&goodsstyle_id=8&num=1', '2130706433', '本地局网地址', 1, 1586098780),
(130, 13, '/home/order/addorder.html', '2130706433', '本地局网地址', 2, 1586098817),
(131, 14, '/', '2130706433', '本地局网地址', 135, 1586143579),
(132, 14, '/home/goods/goodsdetail.html?id=9&date_id=11&time_id=29', '2130706433', '本地局网地址', 28, 1586143693),
(133, 14, '/home/goods/goodsdetail.html?id=12&date_id=11&time_id=28', '2130706433', '本地局网地址', 7, 1586144895),
(134, 14, '/home/goods/goodsdetail.html?id=9&date_id=11&time_id=30', '2130706433', '本地局网地址', 37, 1586147088),
(135, 14, '/home/order/order.html?id=9&date_id=11&time_id=30&goodsstyle_id=1&num=1', '2130706433', '本地局网地址', 1, 1586148768),
(136, 15, '/', '2130706433', '本地局网地址', 1, 1586274227),
(137, 16, '/', '2130706433', '本地局网地址', 21, 1586276152),
(138, 16, '/home/mine/mine.html', '2130706433', '本地局网地址', 5, 1586313590),
(139, 16, '/home/manage/manage.html', '2130706433', '本地局网地址', 2, 1586313594),
(140, 16, '/home/mine/aboutus.html', '2130706433', '本地局网地址', 1, 1586313600),
(141, 16, '/home/mine/mycollect.html', '2130706433', '本地局网地址', 1, 1586318828),
(142, 16, '/home/mine/myaddress.html', '2130706433', '本地局网地址', 1, 1586318830);

-- --------------------------------------------------------

--
-- 表的结构 `sa_rarameter`
--

CREATE TABLE `sa_rarameter` (
  `parameter_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `title` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_rarameter`
--

INSERT INTO `sa_rarameter` (`parameter_id`, `goods_id`, `title`, `content`, `sort`) VALUES
(2, 9, 'test123111dd', '23121', 10),
(3, 9, '123', '11', 10),
(4, 11, 'dwesd.', '111', 10);

-- --------------------------------------------------------

--
-- 表的结构 `sa_recogoods`
--

CREATE TABLE `sa_recogoods` (
  `recogoods_id` int(11) NOT NULL,
  `rushgoods_id` int(11) NOT NULL,
  `rushdate_id` int(11) NOT NULL,
  `title` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_recogoods`
--

INSERT INTO `sa_recogoods` (`recogoods_id`, `rushgoods_id`, `rushdate_id`, `title`, `sort`, `create_time`, `update_time`) VALUES
(2, 2, 6, '123', 4, 1585108847, 1585620155),
(3, 4, 6, '1231', 4, 1585109930, 1585620147),
(4, 5, 6, 'test', 5, 1585478053, 1585620143),
(5, 16, 8, '热死人', 10, 1585829275, 1585829275),
(6, 17, 8, 'fff', 10, 1585830242, 1585830242),
(7, 20, 9, '1231', 10, 1585889786, 1585889786),
(8, 21, 10, '123', 10, 1586098374, 1586098374),
(9, 22, 11, '4422', 10, 1586143666, 1586143666),
(10, 23, 11, 'fff', 10, 1586143677, 1586143677),
(11, 24, 11, '123213', 10, 1586147009, 1586147009),
(12, 25, 11, '2312', 10, 1586149432, 1586149432),
(13, 26, 11, 'dd', 10, 1586150206, 1586150206),
(14, 27, 11, '地方撒', 10, 1586153505, 1586153505);

-- --------------------------------------------------------

--
-- 表的结构 `sa_role`
--

CREATE TABLE `sa_role` (
  `role_id` int(11) NOT NULL,
  `username` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `admin` int(11) NOT NULL DEFAULT '2',
  `power_id` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_role`
--

INSERT INTO `sa_role` (`role_id`, `username`, `admin`, `power_id`, `create_time`, `update_time`) VALUES
(1, '超级管理员', 1, '17,12,13,14,15,16,18,19,20,21,22,23,24,25', 1583661449, 1583708661),
(5, '普通管理员', 2, '17,12,18,19,20,21,22,23,24,25', 1583669617, 1583708676),
(6, '客服', 2, '17', 1583825035, 1583825035);

-- --------------------------------------------------------

--
-- 表的结构 `sa_rushdate`
--

CREATE TABLE `sa_rushdate` (
  `rushdate_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_rushdate`
--

INSERT INTO `sa_rushdate` (`rushdate_id`, `date`, `create_time`, `update_time`) VALUES
(2, 1584892800, 1584935749, 1584935749),
(3, 1584720000, 1584935756, 1584935756),
(4, 1585065600, 1584935771, 1584935771),
(5, 1585411200, 1585478041, 1585478041),
(6, 1585584000, 1585586673, 1585619185),
(7, 1585670400, 1585678305, 1585678305),
(8, 1585756800, 1585823875, 1585823875),
(9, 1585843200, 1585848751, 1585848751),
(10, 1586016000, 1586096914, 1586096914),
(11, 1586102400, 1586143593, 1586143593),
(12, 1586188800, 1586274180, 1586274180),
(13, 1586275200, 1586276214, 1586276214);

-- --------------------------------------------------------

--
-- 表的结构 `sa_rushgoods`
--

CREATE TABLE `sa_rushgoods` (
  `rushgoods_id` int(11) NOT NULL,
  `price_val` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(11,2) DEFAULT '0.00',
  `orprice_val` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `rushdate_id` int(11) NOT NULL,
  `rushtime_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `num` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `num_back` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `style_id` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_rushgoods`
--

INSERT INTO `sa_rushgoods` (`rushgoods_id`, `price_val`, `price`, `orprice_val`, `rushdate_id`, `rushtime_id`, `goods_id`, `create_time`, `update_time`, `num`, `num_back`, `style_id`) VALUES
(2, '100.00/300.00', '0.00', '200.00/600.00', 4, 11, 8, 1585021685, 1585021685, '2000/2000', '2000/2000', ''),
(4, '3000.00/300.00', '0.00', '50000.00/5000.00', 6, 13, 8, 1585108079, 1585626291, '1995/2000', '2000/2000', '4/5'),
(5, '100.00/300.00/300.00', '0.00', '300.00/500.00/500.00', 6, 13, 9, 1585480220, 1585627134, '1997/2000/2000', '2000/2000/2000', '9'),
(6, '3000.00/300.00', '0.00', '50000.00/5000.00', 6, 14, 8, 1585480255, 1585623444, '1998/2000', '2000/2000', '8'),
(9, '100.00/300.00/300.00', '0.00', '300.00/500.00/500.00', 6, 17, 9, 1585636262, 1585636497, '1998/2000/2000', '2000/2000/2000', '1/2/3'),
(10, '3000.00/300.00', '0.00', '50000.00/5000.00', 6, 18, 8, 1585669210, 1585669210, '2000/2000', '2000/2000', '4/5'),
(11, '100.00/300.00/300.00', '0.00', '300.00/500.00/500.00', 7, 19, 9, 1585678347, 1585679564, '1997/2000/1998', '2000/2000/2000', '1/2/3'),
(12, '300.00/300.00', '0.00', '500.00/500.00', 7, 19, 8, 1585678360, 1585681447, '2000/2000', '2000/2000', '4/5'),
(13, '100.00/300.00/300.00', '0.00', '300.00/500.00/500.00', 7, 20, 9, 1585681854, 1585684686, '1/1998/2000', '2000/2000/2000', '1/2/3'),
(14, '300.00/300.00', '0.00', '500.00/500.00', 7, 20, 8, 1585681870, 1585681933, '2000/2000', '2000/2000', '4/5'),
(15, '100.00/300.00/300.00', '0.00', '300.00/500.00/500.00', 8, 21, 9, 1585828146, 1585828146, '2000/2000/2000', '2000/2000/2000', '1/2/3'),
(16, '100.00', '0.00', '1000.00', 8, 22, 10, 1585829003, 1585829003, '2000', '2000', '6'),
(17, '100.00', '0.00', '1000.00', 8, 22, 11, 1585829290, 1585829290, '2000', '2000', '7'),
(18, '100.00/300.00/300.00', '0.00', '300.00/500.00/500.00', 8, 22, 9, 1585830171, 1585830171, '2000/2000/2000', '2000/2000/2000', '1/2/3'),
(19, '100.00', '0.00', '1000.00', 9, 24, 11, 1585848778, 1585848800, '1999', '2000', '7'),
(20, '123.00', '0.00', '11111.00', 9, 26, 12, 1585889775, 1585902195, '1999', '2000', '12'),
(21, '100.00', '0.00', '1000.00', 10, 27, 11, 1586096953, 1586097034, '1920', '2000', '7'),
(22, '123.00', '0.00', '11111.00', 11, 28, 12, 1586143636, 1586143636, '1902', '2000', '8'),
(23, '100.00/300.00/300.00', '0.00', '300.00/500.00/500.00', 11, 29, 9, 1586143655, 1586143655, '1901/2000/2000', '2000/2000/2000', '1/2/3'),
(24, '100.00/300.00/300.00', '0.00', '300.00/500.00/500.00', 11, 30, 9, 1586146995, 1586146995, '2000/2000/2000', '2000/2000/2000', '1/2/3'),
(25, '3000.00/300.00', '0.00', '50000.00/5000.00', 11, 31, 8, 1586149398, 1586149398, '2000/2000', '2000/2000', '4/5'),
(26, '123.00', '0.00', '11111.00', 11, 31, 12, 1586150193, 1586150193, '2000', '2000', '8'),
(27, '100.00', '0.00', '1000.00', 11, 32, 10, 1586153493, 1586153493, '2000', '2000', '6'),
(28, '123.00', '0.00', '11111.00', 12, 33, 12, 1586274204, 1586274204, '2000', '2000', '8'),
(29, '3000.00/300.00', '0.00', '50000.00/5000.00', 12, 33, 8, 1586274216, 1586274216, '2000/2000', '2000/2000', '4/5'),
(30, '3000.00/300.00', '3000.00', '50000.00/5000.00', 13, 34, 8, 1586276279, 1586276366, '2000/2000', '2000/2000', '8'),
(31, '100.00', '100.00', '1000.00', 13, 34, 11, 1586276416, 1586276416, '2000', '2000', '7'),
(32, '300.00/300.00/300.00', '300.00', '300.00/500.00/500.00', 13, 34, 9, 1586276471, 1586276471, '2000/2000/2000', '2000/2000/2000', '1/2/3');

-- --------------------------------------------------------

--
-- 表的结构 `sa_rushtime`
--

CREATE TABLE `sa_rushtime` (
  `rushtime_id` int(11) NOT NULL,
  `rushdate_id` int(11) NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `start_time` int(11) NOT NULL,
  `end_time` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_rushtime`
--

INSERT INTO `sa_rushtime` (`rushtime_id`, `rushdate_id`, `username`, `start_time`, `end_time`, `create_time`, `update_time`) VALUES
(9, 4, '01', 1585069200, 1585072799, 1584953471, 1585021627),
(10, 4, '02', 1585072800, 1585076399, 1584953481, 1585021631),
(11, 4, '03', 1585076400, 1585079999, 1584953509, 1584953509),
(12, 4, '04', 1585080000, 1585083599, 1584953565, 1584953565),
(13, 6, '11:00', 1585623600, 1585627199, 1585021481, 1585620131),
(14, 6, '10:00', 1585620000, 1585623599, 1585480199, 1585619221),
(15, 6, '09:00', 1585616400, 1585619999, 1585586696, 1585619199),
(16, 6, '01', 1585630800, 1585634399, 1585633929, 1585633929),
(17, 6, '14', 1585634400, 1585637999, 1585636250, 1585636250),
(18, 6, '23', 1585666800, 1585670399, 1585669190, 1585669190),
(19, 7, '02', 1585677600, 1585681199, 1585678334, 1585678334),
(20, 7, '03', 1585681200, 1585684799, 1585681832, 1585681832),
(21, 8, '001', 1585821600, 1585825199, 1585823885, 1585823885),
(22, 8, '20', 1585828800, 1585832399, 1585828986, 1585828986),
(23, 8, '21', 1585832400, 1585835999, 1585830201, 1585830201),
(24, 9, '01:00', 1585846800, 1585850399, 1585848765, 1585848765),
(25, 9, '12', 1585886400, 1585889999, 1585889762, 1585889762),
(26, 9, '16', 1585900800, 1585904399, 1585902183, 1585902183),
(27, 10, '11', 1586095200, 1586098799, 1586096938, 1586096938),
(28, 11, '11', 1586142000, 1586145599, 1586143603, 1586143603),
(29, 11, '12', 1586145600, 1586149199, 1586143621, 1586143621),
(30, 11, '13', 1586149200, 1586152799, 1586146982, 1586146982),
(31, 11, '14', 1586152800, 1586156399, 1586149385, 1586149385),
(32, 11, '15', 1586156400, 1586159999, 1586153481, 1586153481),
(33, 12, '1', 1586271600, 1586275199, 1586274190, 1586274190),
(34, 13, '00', 1586275200, 1586278799, 1586276227, 1586276238);

-- --------------------------------------------------------

--
-- 表的结构 `sa_service`
--

CREATE TABLE `sa_service` (
  `service_id` int(11) NOT NULL,
  `title` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `sort` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_service`
--

INSERT INTO `sa_service` (`service_id`, `title`, `content`, `sort`, `create_time`, `update_time`) VALUES
(2, '服务器说明', '123', 10, 1584759086, 1584759086),
(3, '快递说明', '123', 10, 1584775554, 1584775554),
(4, '123', '11ddfs', 10, 1585131480, 1585131484),
(5, '22', '11', 10, 1585889676, 1585889676);

-- --------------------------------------------------------

--
-- 表的结构 `sa_user`
--

CREATE TABLE `sa_user` (
  `user_id` int(32) NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `member_user` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `sex` int(11) NOT NULL DEFAULT '1',
  `tel` varchar(11) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `img` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL,
  `password` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `encrypt` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `initial_pass` varchar(32) COLLATE utf8_unicode_ci DEFAULT '0',
  `useraddress_id` int(11) DEFAULT '0',
  `initialyes` int(11) NOT NULL DEFAULT '2',
  `initialimg` int(11) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_user`
--

INSERT INTO `sa_user` (`user_id`, `username`, `member_user`, `sex`, `tel`, `img`, `create_time`, `update_time`, `password`, `encrypt`, `initial_pass`, `useraddress_id`, `initialyes`, `initialimg`) VALUES
(2, '准会员_pd39617', '准glx095218eh', 1, '13', '3.png', 1585171378, 1585171378, '623f889eb035149fd005c366dbf2f5e4', 'oCRIgZjs', 'dox+5y', NULL, 2, 2),
(3, '准会员_lj24101', '准gam761839mj', 1, '0', '1.png', 1585196482, 1585196482, '0de79fd7af984d56b2351c23f522cce8', 'bLeZfmAz', '6qiluh5t', NULL, 2, 2),
(4, '准会员_bd26557', '准ucz095724va', 1, '0', '3.png', 1585196524, 1585196524, '8f28ff687334cad37534c0378bbcda9e', '9pjrQMm2', 'xmzgh8', NULL, 2, 2),
(7, '准会员_uf61520', '准ptg961574pc', 2, '0', '2.png', 1585473019, 1585473019, 'b980989b34382177948decbcd3a4ad25', '47KmIc0p', '_7au3954', NULL, 2, 2),
(8, '准会员_di38961', '准zle280341hv', 1, '0', '1.png', 1585485194, 1585485194, 'aa91b650edbc0a9e4de8ffeaa2b07ff8', 'gSRWLOpD', 'fw0u6_z', NULL, 2, 2),
(9, '准会员_lo52156', '准xnd512638pu', 2, '0', '4.png', 1585485197, 1585536382, '3fa75bf11cd5e90fe700d6947200341b', 'iu1Z3yh6', 'ynw1h0c3', NULL, 2, 2),
(10, '准会员_ar02237', '准bhu742160cn', 1, '0', '4.png', 1585540328, 1585679974, '924121727e31b1d94a99159a44a97639', 'Be6ZkQJi', 'j3_bl9', 10, 2, 2),
(11, '准会员_qu09137', '准nqd321680kv', 1, '0', '4.png', 1585565892, 1585565892, 'fe15ebd58f23886394ddb5dadc2a1d15', '7JAH3tcp', 'stu26fmb', 0, 2, 2),
(12, '准会员_wp49758', '准tbs901268dx', 1, '0', '3.png', 1585619135, 1585619135, '94db584c616ad5150315358aa7d79ad3', 'hrTPmdfc', '5vftb3', 0, 2, 2),
(13, '准会员_zp18305', '准uil869257ps', 2, '0', '2.png', 1585626675, 1585626675, '44f5df63ea6d2f3c0341c55a57352370', 'CjB5fnYX', 'auw_rp', 0, 2, 2),
(14, '准会员_ac05382', '准lwb190326dg', 1, '0', '4.png', 1585669912, 1585669912, '44c127d6a376527810b96c7ff9ec6fac', 'kNKfR+T7', 'o051m62r', 0, 2, 2),
(15, '准会员_zc26518', '准bxw980754ae', 2, '0', '2.png', 1585674646, 1585674646, '7555890c1935f6914e5831b4af97b970', 'DULbeTEs', 'owmgv19k', 0, 2, 2),
(16, '准会员_jn74546', '准zyd428176vz', 1, '0', '4.png', 1585674753, 1585674753, 'd11b4be07590ebdeda9404ce94e3b0a9', 'MAeFQ7+v', 's23ki+g', 0, 2, 2),
(17, '准会员_pb49083', '准lvt043286cz', 1, '0', '1.png', 1585674823, 1585674823, '3e5e355605771cc202961bbacfea2107', 'S5y_pamM', 'eruyv6h', 0, 2, 2),
(18, '准会员_we42093', '准raq512648vp', 2, '0', '4.png', 1585674831, 1585674831, '3537df1bf21465938bfe9013a19d77a0', 'vQniWhGl', 'e+bunks', 0, 2, 2),
(19, '准会员_fz13043', '准igu038275pn', 2, '0', '4.png', 1585674896, 1585674896, '05ca0f97228c948944071499af0f445d', '2cIgUEdQ', '24h_qt5e', 0, 2, 2),
(20, '准会员_fl96317', '准ird732106fx', 2, '0', '3.png', 1585674912, 1585674912, '6e3479321a677bea0bba662c89f4dd20', 'TtEQBHxc', '8avh5o', 0, 2, 2),
(21, '准会员_fp06913', '准amr560183gl', 2, '0', '4.png', 1585674916, 1585674916, 'b8d6990616a6847592afe03a85b227c0', 'H1ZkMB08', '+jsvdt', 0, 2, 2),
(22, '准会员_zr28534', '准cqu973412hp', 2, '0', '3.png', 1585674940, 1585674940, '7b7a98d70561403971a6425ed5f17709', 'yJtI49RU', 'stfg9m', 0, 2, 2),
(23, '准会员_fg86603', '准cxu508216rg', 2, '0', '3.png', 1585674978, 1585674978, '572ce59fc11f00d06506f8c9422cd7bf', 'rHsuLmvy', 'z91yb7c', 0, 2, 2),
(24, '准会员_kx69842', '准zuw459738mc', 2, '0', '1.png', 1585674994, 1585674994, 'a003198697b63c74fd4fc792d1e85459', 'KqGuZIQx', '7ewjrmns', 0, 2, 2),
(25, '准会员_iv52764', '准vdm578960vm', 1, '0', '2.png', 1585675021, 1585675021, 'eb5d41c59b02c23c403deec963b83778', '4BfSrWxT', 'tzfg+lcp', 0, 2, 2),
(26, '准会员_hy33825', '准pia312857cb', 2, '0', '1.png', 1585675037, 1585675037, '4ba49f0942a24f032256186ac6d75d25', 'mrDegJ8b', 'fwstm7', 0, 2, 2),
(27, '准会员_dw34012', '准rzp219860nr', 1, '0', '3.png', 1585675049, 1585675049, '30d8e4690dc8e540182badc179aec0ec', 'j7T0fRrU', 'by0dij', 0, 2, 2),
(28, '准会员_nu82950', '准ocx976841dc', 2, '0', '1.png', 1585675058, 1585675058, '751c401c66df276382bd06d60d344d2a', 'egHZqPVQ', '_3o+fi', 0, 2, 2),
(29, '准会员_ke77380', '准zfu630187qk', 2, '0', '3.png', 1585675061, 1585675061, '916ca1b35bcdff36c1197dfc54cb235a', 'uxkegq+r', 'i93wd+', 0, 2, 2),
(30, '准会员_sw21360', '准tva059241ui', 1, '0', '4.png', 1585675366, 1585675366, 'd57f3601cc31c280a0a64e27066cfcb4', 'W4vl1jDk', 'wkt3945', 0, 2, 2),
(31, '准会员_mk06816', '准njd507619kc', 2, '0', '4.png', 1585675404, 1585675404, '1fef4824b322a8f79038d6a474011259', 'c6n0fe+E', 'jy+83cm', 0, 2, 2),
(32, '准会员_nz40551', '准awe765039rp', 1, '0', '3.png', 1585684511, 1585684511, '6fea19050af01602c7ef94b2ffcdd899', 'w82qlsZ5', 'bvnyq62p', 0, 2, 2),
(33, '准会员_xi36939', '准nfs845927sl', 1, '0', '3.png', 1585684668, 1585684668, '6fa2bd3b29c40b90b8f7ada613f8168d', '2Y3_d+gD', 'lbki0g', 0, 2, 2),
(34, '准会员_hl21847', '准qau670582pt', 1, '0', '3.png', 1585684761, 1585684761, 'db98a8cfe69d9c29769ef2e0cf832d7f', 'KaE6R5dm', 'jphbc9x8', 0, 2, 2),
(35, '准会员_ld46546', '准tvb921387mw', 2, '0', '4.png', 1585707217, 1585707217, '9a36278fb9b8817439b093c71e1d8484', 'FUx9DvQH', 'jk3rf1v', 0, 2, 2),
(36, '准会员_en18498', '准hex521076ql', 2, '0', '2.png', 1585797202, 1585797202, 'aeac9b69d2218609e474aa8f46afe084', 'EPRDvGiq', '821w6a5b', 0, 2, 2),
(37, '准会员_ta27063', '准dkc380751rh', 2, '0', '2.png', 1585797212, 1585797212, '58385882f2a96badbef39dd27baabc87', 'spX5vFU_', '9mgclb4q', 0, 2, 2),
(38, '准会员_cn04529', '准frn152730sd', 2, '0', '4.png', 1585829014, 1585887572, '55e7d1b64842ea3b0893d6109833a3af', 'lWoz_u4p', 'kq+ye4ou', 13, 2, 2),
(39, '准会员_kp69776', '准hcm472089cp', 2, '0', '2.png', 1585849014, 1585849014, '0f40d9903c42956d6f70b8cd864557ef', '0H5JE7bA', '1_acmvi', 0, 2, 2),
(40, '准会员_it41859', '准tml864957tf', 1, '0', '2.png', 1585909670, 1585909670, '4be6bed1b1dc28667016541e35f75378', 'qj2rDKis', 'hg4+wc3', 0, 2, 2),
(41, '准会员_sd83478', '准cvz902678ef', 1, '0', '4.png', 1585909690, 1585909690, '76b1ab7134b9cf50434d955328060d8d', '+zD5JRpQ', '3l8hy1bz', 0, 2, 2),
(42, '准会员_pu95423', '准dqw528316cv', 2, '0', '2.png', 1585910450, 1585910450, '010e9bbc860444b33c9530a0bf06d7d4', 'B5KerRXn', '7xbthp', 0, 2, 2),
(43, '准会员_xq79059', '准fex836152xr', 1, '0', '4.png', 1585988186, 1585988186, '0ccb4f0ea54a397b426e7cf73c38a46e', 'e_dUit8j', '1m9p5u', 0, 2, 2),
(44, '准会员_dp47301', '准ycq901467ac', 1, '0', '1.png', 1586096961, 1586096961, '50ae4c2e3a3bf6817c377ef7e27fe3bf', 'ViZmShgx', 'q_e5tp', 0, 2, 2);

-- --------------------------------------------------------

--
-- 表的结构 `sa_useraddress`
--

CREATE TABLE `sa_useraddress` (
  `useraddress_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tel` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `area` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `adder` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_useraddress`
--

INSERT INTO `sa_useraddress` (`useraddress_id`, `user_id`, `username`, `tel`, `area`, `adder`, `create_time`, `update_time`) VALUES
(1, 12, '123123', '13760740438', '河南省许昌市襄城县', '123123', 1585622746, 1585622746),
(2, 12, '123123', '13760740438', '河南省许昌市襄城县', '123123', 1585622768, 1585622768),
(3, 12, '123123', '13760740438', '河南省许昌市襄城县', '123123', 1585622785, 1585622785),
(4, 12, '123123', '13760740438', '河南省许昌市襄城县', '123123', 1585622820, 1585622820),
(5, 12, '123123', '13760740438', '河南省许昌市襄城县', '123123', 1585622833, 1585622833),
(6, 12, '123123', '13760740438', '河南省许昌市襄城县', '123123', 1585622835, 1585622835),
(9, 10, '12', '13760740438', '河南省 许昌市 襄城县', '12311231', 1585679670, 1585679968),
(10, 10, '1231', '13760740438', '河南省 许昌市 襄城县', '123123123', 1585679691, 1585679974),
(11, 32, 'dakun', '13760740438', '河南省 许昌市 襄城县', '1232131231', 1585684522, 1585684522),
(12, 33, '123', '13760740438', '河南省 许昌市 襄城县', '231231', 1585684686, 1585684686),
(13, 38, 'dakun', '13760740438', '河南省 许昌市 襄城县', '123', 1585848800, 1585887572);

-- --------------------------------------------------------

--
-- 表的结构 `sa_userlogin`
--

CREATE TABLE `sa_userlogin` (
  `userlogin_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `ip_adder` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `login_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_userlogin`
--

INSERT INTO `sa_userlogin` (`userlogin_id`, `user_id`, `ip`, `ip_adder`, `login_time`) VALUES
(1, 3, '2130706433', '本地局网地址', 1585196482),
(2, 4, '2130706433', '本地局网地址', 1585196524),
(3, 5, '2130706433', '本地局网地址', 1585472899),
(4, 6, '2130706433', '本地局网地址', 1585472922),
(5, 7, '2130706433', '本地局网地址', 1585473019),
(6, 8, '2130706433', '本地局网地址', 1585485194),
(7, 9, '2130706433', '本地局网地址', 1585485197),
(8, 10, '2130706433', '本地局网地址', 1585540328),
(9, 11, '3232235704', '局域网 对方和您在同一内部网', 1585565892),
(10, 12, '2130706433', '本地局网地址', 1585619135),
(11, 13, '2130706433', '本地局网地址', 1585626675),
(12, 14, '2130706433', '本地局网地址', 1585669912),
(13, 15, '2130706433', '本地局网地址', 1585674646),
(14, 16, '2130706433', '本地局网地址', 1585674753),
(15, 17, '2130706433', '本地局网地址', 1585674823),
(16, 18, '2130706433', '本地局网地址', 1585674831),
(17, 19, '2130706433', '本地局网地址', 1585674896),
(18, 20, '2130706433', '本地局网地址', 1585674912),
(19, 21, '2130706433', '本地局网地址', 1585674916),
(20, 22, '2130706433', '本地局网地址', 1585674940),
(21, 23, '2130706433', '本地局网地址', 1585674978),
(22, 24, '2130706433', '本地局网地址', 1585674994),
(23, 25, '2130706433', '本地局网地址', 1585675021),
(24, 26, '2130706433', '本地局网地址', 1585675037),
(25, 27, '2130706433', '本地局网地址', 1585675049),
(26, 28, '2130706433', '本地局网地址', 1585675058),
(27, 29, '2130706433', '本地局网地址', 1585675061),
(28, 30, '2130706433', '本地局网地址', 1585675366),
(29, 31, '2130706433', '本地局网地址', 1585675404),
(30, 32, '2130706433', '本地局网地址', 1585684511),
(31, 33, '2130706433', '本地局网地址', 1585684668),
(32, 34, '2130706433', '本地局网地址', 1585684761),
(33, 35, '2130706433', '本地局网地址', 1585707217),
(34, 36, '2130706433', '本地局网地址', 1585797202),
(35, 37, '2130706433', '本地局网地址', 1585797212),
(36, 38, '2130706433', '本地局网地址', 1585829014),
(37, 39, '2130706433', '本地局网地址', 1585849014),
(38, 40, '3232235704', '局域网 对方和您在同一内部网', 1585909670),
(39, 41, '3232235691', '局域网 对方和您在同一内部网', 1585909690),
(40, 42, '3232235637', '局域网 对方和您在同一内部网', 1585910450),
(41, 43, '3232235694', '局域网 对方和您在同一内部网', 1585988186),
(42, 44, '2130706433', '本地局网地址', 1586096961);

-- --------------------------------------------------------

--
-- 表的结构 `sa_uv`
--

CREATE TABLE `sa_uv` (
  `uv_id` int(11) NOT NULL,
  `flowdate_id` int(11) NOT NULL,
  `ip` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `ipadder` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `addtime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_uv`
--

INSERT INTO `sa_uv` (`uv_id`, `flowdate_id`, `ip`, `ipadder`, `addtime`) VALUES
(5, 7, '3232235704', '局域网 对方和您在同一内部网', 1585566998),
(6, 7, '2130706433', '本地局网地址', 1585567006),
(7, 8, '2130706433', '本地局网地址', 1585586594),
(8, 8, '2130706433', '本地局网地址', 1585619135),
(9, 9, '2130706433', '本地局网地址', 1585670400),
(10, 10, '2130706433', '本地局网地址', 1585797202),
(11, 11, '2130706433', '本地局网地址', 1585848784),
(12, 11, '3232235704', '局域网 对方和您在同一内部网', 1585909670),
(13, 11, '3232235691', '局域网 对方和您在同一内部网', 1585909690),
(16, 11, '3232235691', '局域网 对方和您在同一内部网', 1585910091),
(17, 11, '2130706433', '本地局网地址', 1585910158),
(18, 11, '3232235704', '局域网 对方和您在同一内部网', 1585910163),
(19, 11, '3232235691', '局域网 对方和您在同一内部网', 1585910182),
(20, 11, '3232235637', '局域网 对方和您在同一内部网', 1585910450),
(21, 12, '3232235694', '局域网 对方和您在同一内部网', 1585988186),
(22, 13, '2130706433', '本地局网地址', 1586096961),
(23, 14, '2130706433', '本地局网地址', 1586143579),
(24, 15, '2130706433', '本地局网地址', 1586274227),
(25, 16, '2130706433', '本地局网地址', 1586276152);

-- --------------------------------------------------------

--
-- 表的结构 `sa_vx`
--

CREATE TABLE `sa_vx` (
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `vx_id` int(11) NOT NULL,
  `vx_user` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `disable` int(11) NOT NULL,
  `create_time` int(11) NOT NULL,
  `update_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_vx`
--

INSERT INTO `sa_vx` (`username`, `vx_id`, `vx_user`, `img`, `disable`, `create_time`, `update_time`) VALUES
('印度阿姐', 2, '123123', '20200405/5e1e6eb76c810aeec74e5402807ab07f.jpeg', 1, 1585352309, 1586096104),
('123', 3, '111', '20200405/5bb3f39a2d5ebc3471da93b135bebcc3.jpg', 1, 1586095095, 1586096278);

-- --------------------------------------------------------

--
-- 表的结构 `sa_web`
--

CREATE TABLE `sa_web` (
  `web_id` int(11) NOT NULL,
  `username` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `seo` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `seointroduction` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `ipc` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `ipc_url` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `sa_web`
--

INSERT INTO `sa_web` (`web_id`, `username`, `seo`, `seointroduction`, `logo`, `ipc`, `ipc_url`) VALUES
(1, '准时抢', '31', '123', '/logo.png', '粤ICP备20020815号-1', 'http://beian.miit.gov.cn');

--
-- 转储表的索引
--

--
-- 表的索引 `sa_about`
--
ALTER TABLE `sa_about`
  ADD PRIMARY KEY (`about_id`);

--
-- 表的索引 `sa_admin`
--
ALTER TABLE `sa_admin`
  ADD PRIMARY KEY (`admin_id`,`role_id`);

--
-- 表的索引 `sa_adminrecord`
--
ALTER TABLE `sa_adminrecord`
  ADD PRIMARY KEY (`adminrecord_id`);

--
-- 表的索引 `sa_aftersale`
--
ALTER TABLE `sa_aftersale`
  ADD PRIMARY KEY (`aftersale_id`);

--
-- 表的索引 `sa_carousel`
--
ALTER TABLE `sa_carousel`
  ADD PRIMARY KEY (`carousel_id`);

--
-- 表的索引 `sa_category`
--
ALTER TABLE `sa_category`
  ADD PRIMARY KEY (`category_id`);

--
-- 表的索引 `sa_comment`
--
ALTER TABLE `sa_comment`
  ADD PRIMARY KEY (`comment_id`,`goods_id`);

--
-- 表的索引 `sa_favorite`
--
ALTER TABLE `sa_favorite`
  ADD PRIMARY KEY (`favorite_id`,`user_id`,`rushdate_id`,`goods_id`,`rushtime_id`);

--
-- 表的索引 `sa_flowdate`
--
ALTER TABLE `sa_flowdate`
  ADD PRIMARY KEY (`flowdate_id`);

--
-- 表的索引 `sa_goods`
--
ALTER TABLE `sa_goods`
  ADD PRIMARY KEY (`goods_id`);

--
-- 表的索引 `sa_goodscarousel`
--
ALTER TABLE `sa_goodscarousel`
  ADD PRIMARY KEY (`goodscarousel_id`,`goods_id`);

--
-- 表的索引 `sa_goodsstyle`
--
ALTER TABLE `sa_goodsstyle`
  ADD PRIMARY KEY (`goodsstyle_id`,`goods_id`);

--
-- 表的索引 `sa_homeclick`
--
ALTER TABLE `sa_homeclick`
  ADD PRIMARY KEY (`homeclick_id`),
  ADD KEY `flowdate_id` (`homedate_id`);

--
-- 表的索引 `sa_homedate`
--
ALTER TABLE `sa_homedate`
  ADD PRIMARY KEY (`homedate_id`);

--
-- 表的索引 `sa_order`
--
ALTER TABLE `sa_order`
  ADD PRIMARY KEY (`order_id`,`user_id`,`goods_id`);

--
-- 表的索引 `sa_power`
--
ALTER TABLE `sa_power`
  ADD PRIMARY KEY (`power_id`) USING BTREE;

--
-- 表的索引 `sa_pv`
--
ALTER TABLE `sa_pv`
  ADD PRIMARY KEY (`pv_id`,`flowdate_id`);

--
-- 表的索引 `sa_rarameter`
--
ALTER TABLE `sa_rarameter`
  ADD PRIMARY KEY (`parameter_id`,`goods_id`);

--
-- 表的索引 `sa_recogoods`
--
ALTER TABLE `sa_recogoods`
  ADD PRIMARY KEY (`recogoods_id`,`rushgoods_id`,`rushdate_id`);

--
-- 表的索引 `sa_role`
--
ALTER TABLE `sa_role`
  ADD PRIMARY KEY (`role_id`);

--
-- 表的索引 `sa_rushdate`
--
ALTER TABLE `sa_rushdate`
  ADD PRIMARY KEY (`rushdate_id`);

--
-- 表的索引 `sa_rushgoods`
--
ALTER TABLE `sa_rushgoods`
  ADD PRIMARY KEY (`rushgoods_id`);

--
-- 表的索引 `sa_rushtime`
--
ALTER TABLE `sa_rushtime`
  ADD PRIMARY KEY (`rushtime_id`,`rushdate_id`);

--
-- 表的索引 `sa_service`
--
ALTER TABLE `sa_service`
  ADD PRIMARY KEY (`service_id`);

--
-- 表的索引 `sa_user`
--
ALTER TABLE `sa_user`
  ADD PRIMARY KEY (`user_id`);

--
-- 表的索引 `sa_useraddress`
--
ALTER TABLE `sa_useraddress`
  ADD PRIMARY KEY (`useraddress_id`,`user_id`);

--
-- 表的索引 `sa_userlogin`
--
ALTER TABLE `sa_userlogin`
  ADD PRIMARY KEY (`userlogin_id`,`user_id`);

--
-- 表的索引 `sa_uv`
--
ALTER TABLE `sa_uv`
  ADD PRIMARY KEY (`uv_id`,`flowdate_id`);

--
-- 表的索引 `sa_vx`
--
ALTER TABLE `sa_vx`
  ADD PRIMARY KEY (`vx_id`);

--
-- 表的索引 `sa_web`
--
ALTER TABLE `sa_web`
  ADD PRIMARY KEY (`web_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `sa_about`
--
ALTER TABLE `sa_about`
  MODIFY `about_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `sa_admin`
--
ALTER TABLE `sa_admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- 使用表AUTO_INCREMENT `sa_adminrecord`
--
ALTER TABLE `sa_adminrecord`
  MODIFY `adminrecord_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- 使用表AUTO_INCREMENT `sa_aftersale`
--
ALTER TABLE `sa_aftersale`
  MODIFY `aftersale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `sa_carousel`
--
ALTER TABLE `sa_carousel`
  MODIFY `carousel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `sa_category`
--
ALTER TABLE `sa_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `sa_comment`
--
ALTER TABLE `sa_comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `sa_favorite`
--
ALTER TABLE `sa_favorite`
  MODIFY `favorite_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `sa_flowdate`
--
ALTER TABLE `sa_flowdate`
  MODIFY `flowdate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用表AUTO_INCREMENT `sa_goods`
--
ALTER TABLE `sa_goods`
  MODIFY `goods_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `sa_goodscarousel`
--
ALTER TABLE `sa_goodscarousel`
  MODIFY `goodscarousel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `sa_goodsstyle`
--
ALTER TABLE `sa_goodsstyle`
  MODIFY `goodsstyle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `sa_homeclick`
--
ALTER TABLE `sa_homeclick`
  MODIFY `homeclick_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `sa_homedate`
--
ALTER TABLE `sa_homedate`
  MODIFY `homedate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `sa_order`
--
ALTER TABLE `sa_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- 使用表AUTO_INCREMENT `sa_power`
--
ALTER TABLE `sa_power`
  MODIFY `power_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- 使用表AUTO_INCREMENT `sa_pv`
--
ALTER TABLE `sa_pv`
  MODIFY `pv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- 使用表AUTO_INCREMENT `sa_rarameter`
--
ALTER TABLE `sa_rarameter`
  MODIFY `parameter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `sa_recogoods`
--
ALTER TABLE `sa_recogoods`
  MODIFY `recogoods_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `sa_role`
--
ALTER TABLE `sa_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `sa_rushdate`
--
ALTER TABLE `sa_rushdate`
  MODIFY `rushdate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用表AUTO_INCREMENT `sa_rushgoods`
--
ALTER TABLE `sa_rushgoods`
  MODIFY `rushgoods_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- 使用表AUTO_INCREMENT `sa_rushtime`
--
ALTER TABLE `sa_rushtime`
  MODIFY `rushtime_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- 使用表AUTO_INCREMENT `sa_service`
--
ALTER TABLE `sa_service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `sa_user`
--
ALTER TABLE `sa_user`
  MODIFY `user_id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- 使用表AUTO_INCREMENT `sa_useraddress`
--
ALTER TABLE `sa_useraddress`
  MODIFY `useraddress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用表AUTO_INCREMENT `sa_userlogin`
--
ALTER TABLE `sa_userlogin`
  MODIFY `userlogin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- 使用表AUTO_INCREMENT `sa_uv`
--
ALTER TABLE `sa_uv`
  MODIFY `uv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- 使用表AUTO_INCREMENT `sa_vx`
--
ALTER TABLE `sa_vx`
  MODIFY `vx_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `sa_web`
--
ALTER TABLE `sa_web`
  MODIFY `web_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
