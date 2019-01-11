import React from 'react';
import Proptypes from 'prop-types'

import LoadingM from '../Loading_M'
import utils from '../../utils/util'


/**
 * <ScrollView loadCallback={function} isend={bool}/>
 * @description 滚动加载组件
 */

export default class ScrollView extends React.Component {
    static contextTypes = {
        handel: Proptypes.func,
        isScroll: Proptypes.bool
    };

    constructor(props) {
        super(props);
        this.onLoadPage = this.onLoadPage.bind(this);
    }

    onLoadPage() {
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let proLoadDis = 30;
        let top = utils.isMobile ? 150 : 100;
        if (scrollTop >= top) {
            if (!this.context.isScroll) {
                this.context.handel(true)
            }
        } else {
            if (this.context.isScroll) {
                this.context.handel(false)
            }
        }
        if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
            this.props.loadCallback && this.props.loadCallback();
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onLoadPage);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onLoadPage);
    }

    render() {
        const {children, isend} = this.props;
        return (
            <div className='scrollview'>
                {children}
                {isend && <LoadingM/>}
            </div>
        );
    }
}