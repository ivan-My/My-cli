import React from 'react'
import styles from './style.scss'
import qrcode from '../../assets/images/2ma@2x.png'

/**
 * @constructor <Qrcode />
 * @description alert 二维码
 */


export function Qrcode(k, handel) {
    /*
     * 1：投票须知
     * 2：今日投票已完成
     * */
    let tit = k === 1 ? "投票须知" : "今日投票已完成";
    const k1 = (
        <React.Fragment>
            <div><span>投票时间：</span>2019年2月1日-2月20日</div>
            <div><span>投票规则：</span>每人每天可投3票</div>
            <div><span>*</span>如发现恶意刷票行为，大赛组委会将取消该选手比赛资格</div>
            <div><span>结果公布：</span>"雅马哈管弦打乐器"微信公众号;</div>
        </React.Fragment>
    );
    const k2 = (
        <React.Fragment>
            <div>欢迎您明日继续为选手投票。</div>
            <div>关注"雅马哈管弦打乐器"微信公众号了解比赛详情</div>
        </React.Fragment>
    );
    let ele = k === 1 ? k1 : k2;

    return (
        <div className={styles.singCover} onClick={() => {
            handel()
        }}>
            <div className={styles.qrcode}>
                    <div className={styles["qr-title"]}>
                        <p>{tit}</p>
                    </div>
                    <div className={styles["qr-content-area"]}>
                        {ele}
                        <img className={styles.qrcodeImg} src={qrcode || null}/>
                        <div className={styles.footer}>长按扫描二维码</div>
                    </div>

            </div>
        </div>
    )

}