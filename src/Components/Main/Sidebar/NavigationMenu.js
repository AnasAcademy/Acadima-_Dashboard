import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../Styles/Main/Sidebar.css';

import LogoutButton from '../LogoutButton';

import dashboard from '../../../Images/Sidebar icons/dashboard.png';
import Activedashboard from '../../../Images/Sidebar icons/activeIcons/Activedashboard.png';

import admission from '../../../Images/Sidebar icons/admission.png';
import Activeadmission from '../../../Images/Sidebar icons/activeIcons/Activeadmission.png';

import classes from '../../../Images/Sidebar icons/classes.png';
import Activeclasses from '../../../Images/Sidebar icons/activeIcons/Activeclasses.png';

import PaymentIcon from '../../../Images/PaymentIcon';

import certificates from '../../../Images/Sidebar icons/certificate.png';
import Activecertificates from '../../../Images/Sidebar icons/activeIcons/Activecertificate.png';

import payment from '../../../Images/Sidebar icons/payment.svg';
import Activepayment from '../../../Images/Sidebar icons/activeIcons/Activepayment.svg';

import notifications from '../../../Images/Sidebar icons/notifications.png';
import Activenotifications from '../../../Images/Sidebar icons/activeIcons/Activenotification.png';

import schedule from '../../../Images/Sidebar icons/schedule.png';
import Activeschedule from '../../../Images/Sidebar icons/activeIcons/Activeschedule.png';

import settings from '../../../Images/Sidebar icons/settings.png';
import Activesettings from '../../../Images/Sidebar icons/activeIcons/Activesettings.png';

function NavigationMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { defaultIcon: dashboard, activeIcon: Activedashboard, label: "الرئيسية", route: "/" },
        { defaultIcon: admission, activeIcon: Activeadmission, label: "القبول و التسجيل", route: "/admission" },
        { defaultIcon: classes, activeIcon: Activeclasses, label: "المقررات الدراسية", route: "/classes" },
        // { defaultIcon: <PaymentIcon fill="#fff"/>, activeIcon: <PaymentIcon fill="#ccf5ff" />, label: "دفع رسوم البرنامج", route: "/program" },
        { defaultIcon: payment, activeIcon: Activepayment, label: "دفع رسوم البرنامج", route: "/program" },
        { defaultIcon: certificates, activeIcon: Activecertificates, label: "الشهادات", route: "/certificates" },
        { defaultIcon: payment, activeIcon: Activepayment, label: "المالية", route: "/installments" },
        { defaultIcon: notifications, activeIcon: Activenotifications, label: "الاشعارات", route: "/notifications" },
        { defaultIcon: schedule, activeIcon: Activeschedule, label: "الخدمات الإلكترونية", route: "/services" },
        { defaultIcon: settings, activeIcon: Activesettings, label: "الإعدادات", route: "/settings" },
    ];

    return (
        <ul className="navigation-menu">
            {menuItems.map((item, index) => (
                <li
                key={index}
                className={`menu-item ${location.pathname === item.route ? "active" : ""}`}
                onClick={() => navigate(item.route)}
                >
                <img
                    src={location.pathname === item.route ? item.activeIcon : item.defaultIcon}
                    alt={item.label}
                    className="sidebar-icon"
                />
                 <span>{item.label}</span>
                </li>
            ))}
            <LogoutButton />
        </ul>
    );
}

export default NavigationMenu;
