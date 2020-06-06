import _ from 'lodash'

let instance: (source: string, style?: string) => string
const pinyin = (source: string, style?: string): string => {
  if (instance) {
    return instance(source, style)
  }

  const HANZI_TO_PINYIN = {
    阿: 'a',
    哎: 'ai',
    安: 'an',
    肮: 'ang',
    凹: 'ao',
    丷: 'ba',
    挀: 'bai',
    扳: 'ban',
    邦: 'bang',
    勹: 'bao',
    陂: 'bei',
    奔: 'ben',
    伻: 'beng',
    屄: 'bi',
    边: 'bian',
    灬: 'biao',
    憋: 'bie',
    汃: 'bin',
    冫: 'bing',
    癶: 'bo',
    峬: 'bu',
    嚓: 'ca',
    偲: 'cai',
    参: 'can',
    仓: 'cang',
    撡: 'cao',
    冊: 'ce',
    嵾: 'cen',
    曽: 'ceng',
    叉: 'cha',
    芆: 'chai',
    辿: 'chan',
    伥: 'chang',
    抄: 'chao',
    车: 'che',
    抻: 'chen',
    阷: 'cheng',
    吃: 'chi',
    充: 'chong',
    抽: 'chou',
    出: 'chu',
    欻: 'chua',
    揣: 'chuai',
    巛: 'chuan',
    刅: 'chuang',
    吹: 'chui',
    旾: 'chun',
    逴: 'chuo',
    呲: 'ci',
    匆: 'cong',
    凑: 'cou',
    粗: 'cu',
    汆: 'cuan',
    崔: 'cui',
    邨: 'cun',
    搓: 'cuo',
    咑: 'da',
    呆: 'dai',
    丹: 'dan',
    当: 'dang',
    刀: 'dao',
    嘚: 'de',
    扥: 'dun',
    灯: 'deng',
    氐: 'di',
    甸: 'dian',
    刁: 'diao',
    爹: 'die',
    丁: 'ding',
    丟: 'diu',
    东: 'dong',
    吺: 'dou',
    厾: 'du',
    耑: 'duan',
    垖: 'dui',
    吨: 'dun',
    多: 'duo',
    妸: 'e',
    诶: 'ei',
    奀: 'en',
    鞥: 'eng',
    儿: 'er',
    发: 'fa',
    帆: 'fan',
    匚: 'fang',
    飞: 'fei',
    分: 'fen',
    丰: 'feng',
    覅: 'fiao',
    仏: 'fo',
    紑: 'fou',
    夫: 'fu',
    旮: 'ga',
    侅: 'gai',
    甘: 'gan',
    冈: 'gang',
    皋: 'gao',
    戈: 'ge',
    给: 'gei',
    根: 'gen',
    刯: 'geng',
    工: 'gong',
    勾: 'gou',
    估: 'gu',
    瓜: 'gua',
    乖: 'guai',
    关: 'guan',
    光: 'guang',
    归: 'gui',
    丨: 'gun',
    呙: 'guo',
    哈: 'ha',
    咍: 'hai',
    佄: 'han',
    夯: 'hang',
    茠: 'hao',
    诃: 'he',
    黒: 'hei',
    拫: 'hen',
    亨: 'heng',
    噷: 'hm',
    叿: 'hong',
    齁: 'hou',
    乎: 'hu',
    花: 'hua',
    怀: 'huai',
    欢: 'huan',
    巟: 'huang',
    灰: 'hui',
    昏: 'hun',
    吙: 'huo',
    丌: 'ji',
    加: 'jia',
    戋: 'jian',
    江: 'jiang',
    艽: 'jiao',
    阶: 'jie',
    巾: 'jin',
    坕: 'jing',
    冂: 'jiong',
    丩: 'jiu',
    凥: 'ju',
    姢: 'juan',
    噘: 'jue',
    军: 'jun',
    咔: 'ka',
    开: 'kai',
    刊: 'kan',
    忼: 'kang',
    尻: 'kao',
    匼: 'ke',
    肎: 'ken',
    劥: 'keng',
    空: 'kong',
    抠: 'kou',
    扝: 'ku',
    夸: 'kua',
    蒯: 'kuai',
    宽: 'kuan',
    匡: 'kuang',
    亏: 'kui',
    坤: 'kun',
    扩: 'kuo',
    垃: 'la',
    来: 'lai',
    兰: 'lan',
    啷: 'lang',
    捞: 'lao',
    肋: 'le',
    勒: 'lei',
    崚: 'leng',
    哩: 'li',
    俩: 'lia',
    奁: 'lian',
    良: 'liang',
    撩: 'liao',
    毟: 'lie',
    拎: 'lin',
    伶: 'ling',
    溜: 'liu',
    囖: 'lo',
    龙: 'long',
    瞜: 'lou',
    噜: 'lu',
    驴: 'lv',
    娈: 'luan',
    掠: 'lüe',
    抡: 'lun',
    罗: 'luo',
    呣: 'm',
    妈: 'ma',
    埋: 'mai',
    嫚: 'man',
    牤: 'mang',
    猫: 'mao',
    嚒: 'me',
    呅: 'mei',
    椚: 'men',
    擝: 'meng',
    咪: 'mi',
    宀: 'mian',
    喵: 'miao',
    乜: 'mie',
    民: 'min',
    名: 'ming',
    谬: 'miu',
    摸: 'mo',
    哞: 'mou',
    毪: 'mu',
    嗯: 'ńg',
    拏: 'na',
    腉: 'nai',
    囡: 'nan',
    囔: 'nang',
    孬: 'nao',
    疒: 'ne',
    娞: 'nei',
    恁: 'nen',
    能: 'neng',
    妮: 'ni',
    拈: 'nian',
    娘: 'niang',
    鸟: 'niao',
    捏: 'nie',
    囜: 'nin',
    宁: 'ning',
    妞: 'niu',
    农: 'nong',
    羺: 'nou',
    奴: 'nu',
    女: 'nv',
    奻: 'nuan',
    疟: 'nüe',
    黁: 'nun',
    挪: 'nuo',
    喔: 'o',
    讴: 'ou',
    妑: 'pa',
    拍: 'pai',
    眅: 'pan',
    乓: 'pang',
    抛: 'pao',
    呸: 'pei',
    喷: 'pen',
    匉: 'peng',
    丕: 'pi',
    囨: 'pian',
    剽: 'piao',
    氕: 'pie',
    姘: 'pin',
    乒: 'ping',
    钋: 'po',
    剖: 'pou',
    仆: 'pu',
    七: 'qi',
    掐: 'qia',
    千: 'qian',
    呛: 'qiang',
    悄: 'qiao',
    苆: 'qie',
    亲: 'qin',
    靑: 'qing',
    卭: 'qiong',
    丘: 'qiu',
    区: 'qu',
    奍: 'quan',
    缺: 'que',
    夋: 'qun',
    呥: 'ran',
    穣: 'rang',
    娆: 'rao',
    惹: 're',
    人: 'ren',
    扔: 'reng',
    日: 'ri',
    茸: 'rong',
    厹: 'rou',
    邚: 'ru',
    挼: 'rua',
    堧: 'ruan',
    婑: 'rui',
    瞤: 'run',
    捼: 'ruo',
    仨: 'sa',
    毢: 'sai',
    三: 'san',
    桒: 'sang',
    掻: 'sao',
    閪: 'se',
    森: 'sen',
    僧: 'seng',
    杀: 'sha',
    筛: 'shai',
    山: 'shan',
    伤: 'shang',
    弰: 'shao',
    奢: 'she',
    申: 'shen',
    升: 'sheng',
    尸: 'shi',
    収: 'shou',
    书: 'shu',
    刷: 'shua',
    衰: 'shuai',
    闩: 'shuan',
    双: 'shuang',
    脽: 'shui',
    吮: 'shun',
    说: 'shuo',
    厶: 'si',
    忪: 'song',
    凁: 'sou',
    苏: 'su',
    狻: 'suan',
    夊: 'sui',
    孙: 'sun',
    唆: 'suo',
    他: 'ta',
    囼: 'tai',
    坍: 'tan',
    汤: 'tang',
    夲: 'tao',
    忑: 'te',
    熥: 'teng',
    剔: 'ti',
    天: 'tian',
    旫: 'tiao',
    帖: 'tie',
    厅: 'ting',
    囲: 'tong',
    偷: 'tou',
    凸: 'tu',
    湍: 'tuan',
    推: 'tui',
    吞: 'tun',
    乇: 'tuo',
    屲: 'wa',
    歪: 'wai',
    弯: 'wan',
    尣: 'wang',
    危: 'wei',
    昷: 'wen',
    翁: 'weng',
    挝: 'wo',
    乌: 'wu',
    夕: 'xi',
    虲: 'xia',
    仙: 'xian',
    乡: 'xiang',
    灱: 'xiao',
    些: 'xie',
    心: 'xin',
    星: 'xing',
    凶: 'xiong',
    休: 'xiu',
    吁: 'xu',
    吅: 'xuan',
    削: 'xue',
    坃: 'xun',
    丫: 'ya',
    恹: 'yan',
    央: 'yang',
    幺: 'yao',
    倻: 'ye',
    一: 'yi',
    囙: 'yin',
    应: 'ying',
    哟: 'yo',
    佣: 'yong',
    优: 'you',
    込: 'yu',
    囦: 'yuan',
    曰: 'yue',
    晕: 'yun',
    帀: 'za',
    災: 'zai',
    兂: 'zan',
    匨: 'zang',
    傮: 'zao',
    则: 'ze',
    贼: 'zei',
    怎: 'zen',
    増: 'zeng',
    扎: 'zha',
    夈: 'zhai',
    枬: 'zhan',
    张: 'zhang',
    佋: 'zhao',
    蜇: 'zhe',
    贞: 'zhen',
    凧: 'zheng',
    之: 'zhi',
    中: 'zhong',
    州: 'zhou',
    朱: 'zhu',
    抓: 'zhua',
    拽: 'zhuai',
    专: 'zhuan',
    妆: 'zhuang',
    隹: 'zhui',
    宒: 'zhun',
    卓: 'zhuo',
    乲: 'zi',
    宗: 'zong',
    邹: 'zou',
    租: 'zu',
    钻: 'zuan',
    厜: 'zui',
    尊: 'zun',
    昨: 'zuo',
  }
  // 修正不正确的拼音
  const fixedWrongPinyinHanzis = {
    沈: 'shen',
    嗲: 'dia',
    碡: 'zhou',
    聒: 'guo',
    炔: 'que',
    蚵: 'ke',
    砉: 'hua',
    嬤: 'mo',
    蹒: 'pan',
    丬: 'pan',
    霰: 'xian',
    豉: 'chi',
    饧: 'xing',
    帧: 'zhen',
    郍: 'na',
    芎: 'xiong',
    谁: 'shui',
  }
  const hanzis = Object.keys(HANZI_TO_PINYIN)
  const pinyins = Object.values(HANZI_TO_PINYIN)
  // 缓存
  const cache: { [key: string]: any } = Object.assign(
    {},
    HANZI_TO_PINYIN,
    fixedWrongPinyinHanzis
  )
  // safari 浏览器修正一些比较汉字
  const isSafari = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/)
  if (isSafari) {
    // 修正 safari 中的比较汉字
    const fixedComparedHanzisInSafari: { [key: string]: string } = {
      丷: '八',
      抽: '婤',
      凑: '腠',
      厾: '艔',
      夫: '伕',
      勾: '佝',
      乎: '乯',
      欢: '犿',
      哩: '刕',
      毟: '列',
      伶: '刢',
      嚒: '么',
      椚: '门',
      擝: '甿',
      娘: '嬢',
      剖: '娝',
      苆: '癿',
      卭: '匔',
      奍: '峑',
      凁: '捜',
      偷: '偸',
      屲: '穵',
      仙: '仚',
      込: '扜',
      优: '攸',
      夈: '捚',
      枬: '沾',
      凧: '争',
      州: '诌',
    }
    Object.keys(fixedComparedHanzisInSafari).forEach(function (hanzi) {
      hanzis[hanzis.indexOf(hanzi)] = fixedComparedHanzisInSafari[hanzi]
    })
    // 如果不需要在 safari 中修正以下汉字，则将以下汉字注释掉即可
    const safariFixedHanzis = {
      凒: 'ai',
      貋: 'an',
      飹: 'bao',
      蛽: 'bei',
      榌: 'bi',
      畁: 'bi',
      禆: 'bi',
      獱: 'bian',
      溊: 'bo',
      淿: 'bo',
      鸔: 'bu',
      廍: 'bu',
      礸: 'ca',
      荝: 'ce',
      犲: 'chai',
      仩: 'chang',
      罉: 'cheng',
      鐣: 'cheng',
      粚: 'chi',
      鵄: 'chi',
      攡: 'chi',
      肔: 'chi',
      槆: 'chun',
      媨: 'cu',
      膥: 'cun',
      迏: 'da',
      迚: 'da',
      跶: 'da',
      亣: 'da',
      侢: 'dai',
      蚮: 'dai',
      艔: 'dao',
      悳: 'de',
      枤: 'di',
      刟: 'diao',
      鈟: 'diao',
      譵: 'dui',
      遻: 'e',
      笩: 'fa',
      匥: 'fan',
      仮: 'fan',
      胐: 'fei',
      襥: 'fu',
      焹: 'gang',
      稁: 'gao',
      峼: 'gao',
      搄: 'gen',
      匔: 'gong',
      簼: 'gou',
      躀: 'guan',
      褁: 'guo',
      駴: 'hai',
      呵: 'he',
      寉: 'he',
      燺: 'he',
      玜: 'hong',
      闀: 'hong',
      蘤: 'hua',
      諙: 'hua',
      鯶: 'huan',
      屶: 'hui',
      檅: 'hui',
      叝: 'ji',
      躤: 'ji',
      笅: 'jiao',
      鞂: 'jie',
      掶: 'jie',
      媫: 'jie',
      嶻: 'jie',
      擮: 'jie',
      礍: 'jie',
      矝: 'jin',
      煡: 'jin',
      璄: 'jing',
      燛: 'jiong',
      鼰: 'ju',
      烥: 'ju',
      灍: 'jue',
      鵕: 'jun',
      钶: 'ke',
      狅: 'kuang',
      軠: 'kuang',
      鋛: 'kuang',
      嗠: 'lao',
      矋: 'lei',
      竰: 'li',
      竂: 'liao',
      謢: 'lu',
      簵: 'lu',
      率: 'lv',
      绿: 'lv',
      嘸: 'm',
      袮: 'mi',
      粎: 'mi',
      杣: 'mian',
      嫹: 'miao',
      琝: 'min',
      吶: 'na',
      呐: 'na',
      抩: 'nan',
      煵: 'nan',
      踙: 'nie',
      倿: 'ning',
      挵: 'nong',
      衂: 'nv',
      渒: 'pai',
      萠: 'pan',
      蘕: 'peng',
      錃: 'pi',
      蠯: 'pi',
      酦: 'po',
      炇: 'pu',
      圑: 'pu',
      暜: 'pu',
      捿: 'qi',
      紪: 'qi',
      嵜: 'qi',
      褀: 'qi',
      騹: 'qi',
      峠: 'qia',
      偂: 'qian',
      嬱: 'qian',
      鞩: 'qiao',
      厒: 'qie',
      鈫: 'qin',
      儬: 'qing',
      濪: 'qing',
      峵: 'rong',
      钑: 'sa',
      炶: 'shan',
      椫: 'shan',
      罙: 'shen',
      鯓: 'shen',
      枡: 'sheng',
      鍟: 'sheng',
      縄: 'sheng',
      膄: 'shou',
      毺: 'shu',
      暺: 'tan',
      砙: 'wa',
      晥: 'wan',
      瞣: 'wan',
      榲: 'wen',
      饂: 'wen',
      攚: 'weng',
      邜: 'xi',
      湺: 'xian',
      鷍: 'xiao',
      炨: 'xie',
      匂: 'xiong',
      潃: 'xiu',
      燅: 'xun',
      訮: 'yan',
      滧: 'yao',
      摿: 'yao',
      磘: 'yao',
      洂: 'ye',
      捙: 'ye',
      璍: 'ye',
      渏: 'yi',
      頥: 'yi',
      鈘: 'yi',
      貖: 'yi',
      袬: 'yu',
      鴧: 'yu',
      伝: 'yun',
      齫: 'yun',
      沯: 'za',
      溨: 'zai',
      煰: 'zao',
      歵: 'ze',
      茋: 'zhi',
      隲: 'zhi',
      钃: 'zhu',
      赼: 'zi',
      荢: 'zi',
      燪: 'zong',
      唨: 'zu',
    }
    Object.assign(cache, safariFixedHanzis)
  }

  const firstHanziCharCode = 19968 // 0x4e00
  const lastHanziCharCode = 40869 // 0x9FA5

  const convert = (target: string, style?: string): string => {
    // 命中缓存，是修正的汉字，或者是之前已经查找过这个汉字
    if (cache[target]) {
      return style === 'first_letter' ? cache[target].charAt(0) : cache[target]
    }

    const charCode = target.charCodeAt(0)
    // 不在比对范围内
    if (charCode < firstHanziCharCode || charCode > lastHanziCharCode) {
      return target
    }

    let start = 0
    let end = hanzis.length - 1
    let index = -1
    let hanzi
    let compareResult: number
    // 二分查找
    while (start <= end) {
      index = parseInt(`${(start + end) / 2}`)
      hanzi = hanzis[index]
      compareResult = target.localeCompare(hanzi, ['zh-CN'])
      if (compareResult === 1) {
        start = index + 1
      } else if (compareResult === -1) {
        end = index - 1
      } else {
        break
      }
    }

    // @ts-ignore
    if (compareResult < 0) {
      index--
    }

    cache[target] = pinyins[index]

    return style === 'first_letter' ? pinyins[index].charAt(0) : pinyins[index]
  }

  const _pinyin = (source: string, style?: string): string => {
    let foundPinyin = ''

    _.forEach(source, (target) => {
      foundPinyin += convert(target, style)
    })

    return foundPinyin
  }

  return ((source, style?) => {
    if (!instance) {
      instance = _pinyin
    }
    return instance(source, style)
  })(source, style)
}

export default pinyin
