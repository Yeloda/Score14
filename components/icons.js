import { Icon } from "@ui-kitten/components";
import React from "react";
import { G, Path, Svg } from "react-native-svg";

export const SearchIcon = (style) => <Icon {...style} name="search" />;
export const PersonIcon = (style) => <Icon {...style} name="person" />;
export const GoogleIcon = (style) => <Icon {...style} name="google" />;
export const FacebookIcon = (style) => <Icon {...style} name="facebook" />;
export const TwitterIcon = (style) => <Icon {...style} name="twitter" />;
export const EmailIcon = (style) => <Icon {...style} name="email" />;
export const MinusIcon = (style) => <Icon {...style} name="minus-circle-outline" />;
export const PlusIcon = (style) => <Icon {...style} name="plus-circle-outline" />;
export const ClockIcon = (style) => <Icon {...style} name="clock-outline" />;
export const ListIcon = (style) => <Icon {...style} name="list-outline" />;
export const MapIcon = (style) => <Icon {...style} name="map-outline" />;
export const StarIcon = (style) => <Icon {...style} name="star" />;
export const HeartIcon = (style) => <Icon {...style} name="heart-outline" />;
export const FavoriteIcon = (style) => <Icon {...style} name="star-outline" />;
export const ArrowRightIcon = (style) => <Icon {...style} name="arrow-forward-outline" />;
export const ArrowIosRightIcon = (style) => <Icon {...style} name="arrow-ios-forward-outline" />;
export const ArrowUpIcon = (style) => <Icon {...style} name="arrow-up" />;
export const ArrowBackIcon = (style) => <Icon {...style} name="arrow-back" />;
export const ArrowForwardIcon = (style) => <Icon {...style} name="arrow-forward" />;
export const TruckIcon = (style) => <Icon {...style} name="car-outline" />;
export const CheckIcon = (style) => <Icon {...style} name="checkmark-circle-2-outline" />;
export const SingleCheckIcon = (style) => <Icon {...style} name="checkmark-outline" />;
export const NavigationIcon = (style) => <Icon {...style} name="navigation-2-outline" />;
export const PriceIcon = (style) => <Icon {...style} name="pricetags-outline" />;
export const EditIcon = (style) => <Icon {...style} name="edit-outline" />;
export const CreditCardIcon = (style) => <Icon {...style} name='credit-card'/>;
export const CreditCardOutlineIcon = (style) => <Icon {...style} name='credit-card-outline'/>;
export const MoreVerticalIcon = (style) => <Icon {...style} name='more-vertical'/>;
export const CalendarIcon = (style) => <Icon {...style} name='calendar-outline'/>;
export const KeypadIcon = (style) => <Icon {...style} name='keypad'/>;
export const BarChartIcon = (style) => <Icon {...style} name='bar-chart-outline'/>;
export const DoneAllIcon = (style) => <Icon {...style} name='done-all-outline'/>;
export const PieChartIcon = (style) => <Icon {...style} name='pie-chart-outline'/>;
export const AddIcon = (style) => <Icon {...style} name='plus-circle-outline'/>;
export const SaveIcon = (style) => <Icon {...style} name='save-outline'/>;
export const DeleteIcon = (style) => <Icon {...style} name='trash-2-outline'/>;
export const RefreshIcon = (style) => <Icon {...style} name='refresh-outline'/>;
export const GridIcon = (style) => <Icon {...style} name='grid-outline'/>;
export const KeypadOutlineIcon = (style) => <Icon {...style} name='keypad-outline'/>;
export const SquareIcon = (style) => <Icon {...style} name='square-outline'/>;
export const AwardIcon = (style) => <Icon {...style} name='award-outline'/>;
export const EyeIcon = (style) => <Icon {...style} name='eye-outline'/>;
export const SettingsIcon = (style) => <Icon {...style} name='settings-2-outline'/>;
export const FlagIcon = (style) => <Icon {...style} name='flag-outline'/>;
export const LockIcon = (style) => <Icon {...style} name='lock-outline'/>;
export const BellIcon = (style) => <Icon {...style} name='bell-outline'/>;
export const BookIcon = (style) => <Icon {...style} name='book-open-outline'/>;
export const ChatIcon = (style) => <Icon {...style} name='message-circle-outline'/>;
export const QuestionIcon = (style) => <Icon {...style} name='question-mark-circle-outline'/>;
export const HorizontalIcon = (style) => <Icon {...style} name='more-horizontal-outline'/>;
export const WorkIcon = (style) => <Icon {...style} name='briefcase-outline'/>;
export const FileIcon = (style) => <Icon {...style} name='file-text-outline'/>;
export const PinIcon = (style) => <Icon {...style} name='pin-outline'/>;
export const CloseIcon = (style) => <Icon {...style} name='close-outline'/>;
export const BankIcon = (style) => <Icon {...style} name='file-outline'/>;
export const RecurrentIcon = (style) => <Icon {...style} name='sync-outline'/>;
export const EmailOutlineIcon = (style) => <Icon {...style} name='email-outline'/>;
export const PhoneIcon = (style) => <Icon {...style} name='phone-outline'/>;

export const HomeIcon = (style) => <Icon {...style} name="home" />;
export const MenuIcon = (style) => <Icon {...style} name="menu" />;
export const ArrowIosBackIcon = (style) => <Icon {...style} name="arrow-ios-back" />;
export const InfoIcon = (style) => <Icon {...style} name="info-outline" />;
export const LoginIcon = (style) => <Icon {...style} name="log-in" />;
export const LogoutIcon = (style) => <Icon {...style} name="log-out-outline" />;
export const ActivityIcon = (style) => <Icon {...style} name="activity" />;
export const VideoIcon = (style) => <Icon {...style} name="video-outline" />;

export const SuccessIcon = ({style}) => {
    return(
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            <Path d="M11 0C4.939 0 0 4.939 0 11C0 17.061 4.939 22 11 22C17.061 22 22 17.061 22 11C22 4.939 17.061 0 11 0ZM16.258 8.47L10.021 14.707C9.86631 14.8615 9.65663 14.9483 9.438 14.9483C9.21937 14.9483 9.00969 14.8615 8.855 14.707L5.742 11.594C5.58857 11.4387 5.50253 11.2293 5.50253 11.011C5.50253 10.7927 5.58857 10.5833 5.742 10.428C6.061 10.109 6.589 10.109 6.908 10.428L9.438 12.958L15.092 7.304C15.411 6.985 15.939 6.985 16.258 7.304C16.577 7.623 16.577 8.14 16.258 8.47Z" fill="white"/>
        </Svg>
    )
}

export const NewTwitterIcon = ({style}) => {
    return(
        <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8.41598 12.2972C8.27716 12.4583 8.14385 12.6125 8.01191 12.7667C7.03061 13.9096 6.04862 15.0525 5.06731 16.1961C4.45297 16.9121 3.84069 17.6289 3.22634 18.3442C2.74531 18.9046 2.26222 19.4637 1.78188 20.0248C1.74133 20.0716 1.70354 20.1005 1.63619 20.0999C1.12286 20.0964 0.610222 20.0985 0.0968933 20.0978C0.0769649 20.0978 0.0570365 20.0944 0.0350465 20.0923C0.0714674 20.0104 1.7647 18.0289 2.55908 17.1153C3.41669 16.13 4.26262 15.1338 5.11336 14.143C5.96135 13.1557 6.80933 12.1691 7.66144 11.177C5.10855 7.45365 2.56252 3.73993 0 0.00279879C0.0714674 0.00279879 0.116135 0.00279879 0.160115 0.00279879C2.00796 0.00279879 3.8558 0.00348728 5.70365 4.48241e-05C5.80054 4.48241e-05 5.85414 0.0330924 5.90568 0.108826C6.33792 0.744304 6.77291 1.37703 7.20721 2.01044C7.86348 2.96813 8.51974 3.92513 9.176 4.88214C9.7285 5.68767 10.281 6.49321 10.8342 7.29874C10.8527 7.32559 10.8734 7.35175 10.9008 7.38824C10.9304 7.35933 10.9579 7.33661 10.9812 7.31045C11.5763 6.61645 12.1701 5.92245 12.7659 5.22845C13.7444 4.08831 14.7243 2.94954 15.7029 1.8094C16.1922 1.23933 16.6828 0.670635 17.1694 0.0984991C17.2285 0.0289615 17.2882 -0.00133216 17.3817 4.48241e-05C17.8655 0.00486426 18.3493 0.0021103 18.8337 0.0021103C18.8667 0.0021103 18.8997 0.0021103 18.9292 0.0021103C18.9347 0.0131262 18.9368 0.0165686 18.9382 0.0200111C18.9396 0.0234535 18.9409 0.0289615 18.9389 0.0310269C16.5186 2.85384 14.0983 5.67666 11.6664 8.51255C14.3093 12.3667 16.9522 16.2209 19.6102 20.0971C19.5443 20.0971 19.5044 20.0971 19.4646 20.0971C17.6167 20.0971 15.7682 20.0964 13.9203 20.0992C13.8166 20.0992 13.7554 20.0675 13.697 19.9821C12.836 18.7194 11.9715 17.4595 11.107 16.1996C10.314 15.0429 9.52028 13.8855 8.72658 12.7289C8.64412 12.6084 8.56235 12.4872 8.47851 12.3674C8.4627 12.3447 8.44209 12.3254 8.41529 12.2958L8.41598 12.2972ZM2.34743 1.31162C2.36873 1.34673 2.37629 1.36119 2.38591 1.37427C3.35622 2.76434 4.32653 4.15371 5.29615 5.54378C5.97715 6.51937 6.65609 7.49703 7.33641 8.47262C7.93632 9.33186 8.53761 10.1897 9.13752 11.0496C10.0096 12.2993 10.8802 13.5502 11.7523 14.7999C12.6765 16.1252 13.6022 17.4499 14.5251 18.7759C14.567 18.8358 14.6089 18.8668 14.6859 18.8661C15.5077 18.8633 16.3296 18.864 17.1515 18.8633C17.1776 18.8633 17.2037 18.8558 17.2429 18.8489C17.2188 18.8089 17.203 18.78 17.1852 18.7539C16.9185 18.3697 16.6512 17.9862 16.3839 17.6027C15.6335 16.528 14.8824 15.4539 14.132 14.3785C13.2483 13.1117 12.3652 11.8442 11.4815 10.5766C10.5408 9.22721 9.59862 7.87845 8.65787 6.5297C7.4656 4.82086 6.27333 3.11271 5.08381 1.4025C5.03227 1.32883 4.97867 1.30129 4.88933 1.30198C4.08464 1.30542 3.27994 1.30336 2.47456 1.30336C2.43814 1.30336 2.4024 1.3068 2.34743 1.31024V1.31162Z" fill="white"/>
        </Svg>
    )
}

export const BlueSkyIcon = ({style}) => {
    return(
        <Svg fill="none" viewBox="0 0 64 57" width="48" style={{width: 23, height: 23}} xmlns="http://www.w3.org/2000/svg">
            <Path fill="#FFF" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z" />
        </Svg>
    )
}

export const LinkedInIcon = ({style}) => {
    return(
        <Svg fill="none" viewBox="0 0 30 60" width="48" style={{width: 40, height: 40}} xmlns="http://www.w3.org/2000/svg">
            <G>
                <Path fill="#FFF" d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z" />
            </G>
        </Svg>
    )
}
