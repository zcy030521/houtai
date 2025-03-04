"use client"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {useRouter} from 'next/navigation'

export default function Bookspage() {
    const Router = useRouter();
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: 'sub4',
            label: 'Navigation Three',
            icon: <SettingOutlined />,
            children: [
                { key: "/name", label: 'Option 9' },
                { key: '10', label: 'Option 10' },
                { key: '11', label: 'Option 11' },
                { key: '12', label: 'Option 12' },
            ],
        },
    ];
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        Router.push(e.key);
      };
    return (
        <>
            <Menu
                style={{ width: 256 }}
                onClick={onClick}
                mode="inline"
                items={items}
            />
        </>
    );
}