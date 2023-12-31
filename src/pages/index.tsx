import * as React from 'react';
import {Link, matchPath, Redirect, RouteComponentProps, Switch} from 'react-router-dom';
import {AsideNav, Button, Layout, Select, toast} from 'amis';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import request from '@/utils/requestInterceptor';
import RouterGuard from "@/routes/RouterGuard";

type NavItem = {
    title: string;
    children?: Array<NavItem>;
    icon?: string;
    path?: string;
    component?: React.ReactType;
    getComponent?: () => Promise<React.ReactType>;
};


function isActive(link: any, location: any) {
    const ret = matchPath(location.pathname, {
        path: link ? link.replace(/\?.*$/, '') : '',
        exact: true,
        strict: true
    });

    return !!ret;
}

export interface AdminProps extends RouteComponentProps<any> {
    store: IMainStore
}

@inject("store")
@observer
export default class Admin extends React.Component<AdminProps, any> {

    renderHeader() {
        const store = this.props.store;

        const onApplicationChange = (value: any) => {
            let menus: any = this.state.menus;
            this.setState({
                navigations: [menus[value.value]] || []
            });
        };

        const onWarehouseChange = (value: any) => {
            this.props.store.warehouse.setWarehouseCode(value.value)
        }

        return (
            <div>
                <div className={`cxd-Layout-brandBar`}>
                    <button
                        onClick={store.toggleOffScreen}
                        className="pull-right visible-xs"
                    >
                        <i className="fa fa-bars text-white"/>
                    </button>
                    <div className={`cxd-Layout-brand`}>
                        {/*<i className="fa fa-paw"/>*/}
                        <span className="hidden-folded m-l-sm">SWMS</span>
                    </div>
                </div>
                <div className={`cxd-Layout-headerBar`}>
                    <div className="nav navbar-nav hidden-xs pull-left">
                        <Button
                            level="link"
                            className="no-shadow navbar-btn"
                            onClick={store.toggleAsideFolded}
                            tooltip="展开或收起侧边栏"
                            placement="bottom"
                            iconOnly
                        >
                            <i className={store.asideFolded ? 'fa fa-indent' : 'fa fa-outdent'}/>
                        </Button>
                    </div>

                    <div className="nav navbar-nav hidden-xs pull-left">
                        <Select
                            showSearch
                            placeholder="select warehouse"
                            optionFilterProp="children"
                            onChange={onWarehouseChange}
                            options={this.state.warehouses}
                        />
                    </div>

                    <div className="nav navbar-nav hidden-xs pull-left">
                        <Select
                            showSearch
                            placeholder="select application"
                            optionFilterProp="children"
                            onChange={onApplicationChange}
                            options={this.state.applications}
                        />
                    </div>

                    <div className="m-l-auto hidden-xs pull-right">
                        <span>{store.user.name}</span><span className={'btn btn-link'} onClick={this.logout}>[退出]</span>
                    </div>
                </div>


            </div>
        );
    }

    state = {
        menus: Object,
        applications: [],
        warehouses: [],
        pathname: '',
        hasLoadMenu: false,
        navigations: []
    }

    logout = () => {
        const store = this.props.store;
        store.user.logout()
        const history = this.props.history;
        history.replace(`/login`)
    }

    componentDidMount() {
        const store = this.props.store;
        const history = this.props.history;
        console.log("componentDidMount, store.user:", store.user)
        if (!store.user.isAuthenticated) {
            toast['error']('用户未登陆，请先登陆！', '消息')
            history.replace(`/login`)
        }
        this.refreshMenu()
    }

    componentDidUpdate() {
        this.refreshMenu()
    }

    refreshMenu = () => {
        const store = this.props.store;
        let pathname = this.props.location.pathname;
        if (pathname != 'login' && pathname != '/' && !this.state.hasLoadMenu && store.user.isAuthenticated) {
            request({
                method: "get",
                url: '/user/api/currentUser/getAuth'
            }).then((res: any) => {

                let menus = res.data.menus;
                let applications: string[] = Object.keys(menus);
                let navigations = [menus[applications[0]]] || [];

                const options = applications.map(value => {
                    return {value: value, label: value};
                })

                this.setState({
                        menus: menus,
                        navigations: navigations,
                        applications: options,
                        hasLoadMenu: true
                    }
                )

                this.initWarehouseSelect(res.data.warehouses);
            })

        }
    }

    private initWarehouseSelect(warehouses: string) {
        request({
            method: "post",
            url: "/search/search/searchSelectResult?perPage=1000&activePage=1",
            data: {
                searchIdentity: "SearchWarehouseMainData",
                searchObject: {
                    tables: "m_warehouse_main_data",
                    where: "warehouse_code in (" + warehouses + ")"
                },
                showColumns: [
                    {
                        dbField: "warehouse_code",
                        name: "value",
                        javaType: "java.lang.String"
                    },
                    {
                        dbField: "warehouse_name",
                        name: "label",
                        javaType: "java.lang.String"
                    }
                ]
            }
        }).then((res: any) => {
            this.setState({
                    warehouses: res.data.data.options,
                }
            )
            this.props.store.warehouse.setWarehouseCode(res.data.data.options[0].value)
        })
    }

    renderAside() {
        const location = this.props.location;
        const store = this.props.store;

        return (
            <AsideNav
                key={store.asideFolded ? 'folded-aside' : 'aside'}
                navigations={this.state.navigations}
                renderLink={({link, toggleExpand, classnames: cx, depth}: any) => {
                    if (link.hidden) {
                        return null;
                    }
                    let children = [];

                    if (link.children) {
                        children.push(
                            <span
                                key="expand-toggle"
                                className={cx('AsideNav-itemArrow')}
                                onClick={(e) => toggleExpand(link, e)}
                            />
                        );
                    }

                    link.badge && children.push(
                        <b key="badge"
                           className={cx(`AsideNav-itemBadge`, link.badgeClassName || 'bg-info')}>{link.badge}</b>
                    );

                    if (link.icon) {
                        children.push(
                            <i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)}/>
                        )
                    } else if (store.asideFolded && depth === 1) {
                        children.push(
                            <i key="icon"
                               className={cx(`AsideNav-itemIcon`, link.children ? 'fa fa-folder' : 'fa fa-info')}/>
                        )
                    }

                    children.push(
                        <span key="label" className={cx('AsideNav-itemLabel')}>{link.title}</span>
                    );

                    return link.path
                        ? (link.active ? <a>{children}</a> : <Link to={link.path}>{children}</Link>)
                        : (
                            <a onClick={link.onClick ? link.onClick : link.children ? () => toggleExpand(link) : undefined}>{children}</a>);
                }}

                isActive={(link: any) => isActive(link.path, location)}
            />
        );
    }


    render() {
        const store = this.props.store;
        let pathname = this.props.location.pathname;
        console.log("location:", pathname)
        if (pathname == 'login' || pathname == '/') {
            return (
                <Switch>
                    <RouterGuard/>
                    <Redirect to={`/404`}/>
                </Switch>
            )
        } else {
            return (
                <Layout
                    aside={this.renderAside()}
                    header={this.renderHeader()}
                    folded={store.asideFolded}
                    offScreen={store.offScreen}
                >
                    <Switch>
                        <RouterGuard/>
                        <Redirect to={`/404`}/>
                    </Switch>
                </Layout>
            );
        }

    }
}
