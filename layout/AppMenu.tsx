/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: 'Library',
            items: [{ label: 'Checkout Books', icon: 'pi pi-fw pi-book', to: '/' }]
        },
        {
            label: 'Management',
            items: [
                { label: 'Users', icon: 'pi pi-fw pi-user-edit', to: '/uikit/users' },
                { label: 'Books', icon: 'pi pi-fw pi-database', to: '/uikit/books' },
                { label: 'Returns', icon: 'pi-check-square', to: '/uikit/records' },
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
