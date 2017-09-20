var dataItems = [
    {
        src: './assets/imgs/img1.png',
        w: 1000 * 2,
        h: 750 * 2,
        title: '阿王',
        time: '298天',
        text: '　　“作者这幅钢笔速写建筑物风景作品 ，作者在建筑物细节方面的处理还是非常细致的，尤其是屋檐特别提神；作者用了比较强的对比度来体现了其体积感，视觉冲击力很大。背景的植物虚化的非常到位做到了陪衬的效果。”——我要学平台亓老师',
    },
    {
        src: './assets/imgs/img2.png',
        w: 570 * 2,
        h: 658 * 2,
        title: '腹有诗书气自华',
        time: '393天',
        text: '　　“同学你好，这张工笔作品画的感觉还是非常不错的，整个作品的线条流畅自然有力道，叶子与花瓣的晕染都非常自然，最后花蕾的点缀都表现的非常到位，是一张非常棒的作品。”——我要学平台谷老师',
    },
    {
        src: './assets/imgs/img3.png',
        w: 600 * 2,
        h: 900 * 2,
        title: '林零',
        time: '64天',
        text: '　　“林同学你好，你的这幅板绘作品非常优秀。画面很丰富。颜色的搭配上还是很老练的。比如在后面的处理，懂得让颜色灰一点不跳出来。流动红旗的红色用的很好，画面的秩序感还可以，显得比较有层次。加油！”——我要学平台陈老师',
    },
    {
        src: './assets/imgs/img4.png',
        w: 683 * 2,
        h: 1300 * 2,
        title: '乌断',
        time: '284天',
        text: '　　“同学你好，画面人物弗丽嘉为nott的女儿，你利用了良好的压感笔，通过不错的参数调节了整体的人物，良好的光影关系，将人物的衣着和珠宝体现的非常好质感，这方面还参见了刚铎王朝的里面一些剧本，也是非常有想法，看得出你在平时也是极具文学艺术细胞的一位作者。继续努力，加油！”——我要学平台张老师',
    },
    {
        src: './assets/imgs/img5.png',
        w: 486 * 2,
        h: 640 * 2,
        title: '曹晋瑶',
        time: '75天',
        text: '　　“同学你好，这幅临摹作品临的是著名的永乐宫的壁画，你基本上能描摹完成了，但要注意脸部的结构线，如脸部和眼睛的对称性。头上的发簪画得比较松散要注意，加油！ ”——我要学平台陈老师',
    },
    {
        src: './assets/imgs/img6.png',
        w: 805 * 2,
        h: 1200 * 2,
        title: '云卷云舒',
        time: '105天',
        text: '　　“我要学亓老师点评：作者这幅国画作品中感觉 1.作者在花瓣的边缘线条处理的上感觉稍微有些偏硬，不够流畅柔美 。2.枝干的质感体现的还是比较不错的，干湿度把握的很好。 3.晕染花瓣的色彩加水太多了，洇出边缘线太多了。”——我要学平台亓老师',
    },
    {
        src: './assets/imgs/img7.png',
        w: 1040 * 2,
        h: 780 * 2,
        title: '海洋',
        time: '41天',
        text: '　　“同学，你好，这三幅画着重体现了你对于光影的把控，在画面层次尤其是灰度和高光的理解上有了自己的见解，所以整体的画面感是非常不错的，希望有时间和大家分享你的技法和心得。”——我要学平台韩老师',
    },
    {
        src: './assets/imgs/img8.png',
        w: 1000 * 2,
        h: 750 * 2,
        title: '小文文',
        time: '86天',
        text: '　　“同学你好，这幅作品是临摹莫奈的名作，日出印象，和原作相比，你把天际线画得太实在了，天空颜色偏黄了，可以多加些显示气氛的颜色，比如远景船舶的蓝色，给人一种日出雾气弥漫的感觉。加油！”——我要学平台陈老师',
    },
    {
        src: './assets/imgs/img9.png',
        w: 462 * 2,
        h: 720 * 2,
        title: '禅合容美',
        time: '115天',
        text: '　　“同学你好，这幅黑白装饰画整体效果看起来还是不错的，但是有几点做的还不足，稍加改进的话会更好，给你几点建议： 1.右上角那个角的颜色太深了，作为旁边的物体，可以不用画的这么抢眼，抢了视觉中心。 2.头部画的不够精致，不足以作为视觉中心支撑整个画面。头部可以画大一点，画精细一点。3.单一的排线的线条重复的太多了，要分清楚哪些地方要着重哪些地方可以省略。期待你更多的作品，加油！”——我要学平台姜老师',
    },
    {
        src: './assets/imgs/img10.png',
        w: 685 * 2,
        h: 1065 * 2,
        title: '司皇',
        time: '418天',
        text: '　　“同学你好！你这张漫画整体感觉非常好，构图很饱满，尤其是颜色搭配的非常清新透亮，人物刻画的也很不错。可以多在物体体积的塑造上下点功夫。非常棒加油！”——我要学平台张老师',
    },
    {
        src: './assets/imgs/img11.png',
        w: 595 * 2,
        h: 793 * 2,
        title: '唐糖',
        time: '106天',
        text: '　　“达达主义的蒙娜丽莎！很开心你对世界名画做出了这样新的解释！很棒很大胆的画作！人物刻画很有个人鲜明的个性特色！希望小朋友能更多的开发思维，进行创新。期待看到你更多的有想法的作品！”——我要学平台陈老师',
    },
    {
        src: './assets/imgs/img12.png',
        w: 750 * 2,
        h: 1000 * 2,
        title: '一苇以航',
        time: '54天',
        text: '　　“这幅画面很有想法，虽然主旨上来讲有一点抽象和空明，但是从孩子的心理来讲，所有线条和色彩都是他所观察到和感觉到的，继续这样的涂鸦，有利于培养他对于结构的认识，不错。”——我要学平台魏老师',
    },
    {
        src: './assets/imgs/img13.png',
        w: 997 * 2,
        h: 748 * 2,
        title: '圻圻',
        time: '378天',
        text: '　　“同学你好，这幅作品整体感完成的很不错。这幅作品的颜色搭配很好，整体色调不错，符合人们对西藏的颜色印象。对于画面中想突出的主体建议刻画的再突出一些就更好。加油，希望你多多创作出优质的作品。”——我要学平台王老师',
    },
    {
        src: './assets/imgs/img14.png',
        w: 1066 * 2,
        h: 800 * 2,
        title: '榕榕',
        time: '49天',
        text: '　　“同学你好，这幅作品画面感不错哦，说下几点小建议： （1）整幅作品的风格还是不错的，颜色艳丽，但画面中没有细腻的东西，比如房子的结构可以再加一些勾边效果。 （2）画面可以加些明暗关系，让田野和房子更加立体。（3）小朋友在绘画的时候最好有软线条和硬朗的线条进行对比，这样效果会更好哦！”——我要学平台卢老师',
    },
];