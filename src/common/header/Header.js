import './Header.css';

function Header() {
    return (<div className={"header"}>
        <span>IR-MCI | Irancell</span>
        <span className="header__icons">
            <span className="header__icon material-icons">wifi</span>
            <span className="header__icon material-icons">signal_cellular_alt</span>
            <span className="header__icon material-icons">import_export</span>
            <span className="header__icon material-icons">bluetooth_connected</span>
            <span className="header__icon material-icons">alarm</span>
            <span className="header__battery-percent">99%</span>
            <span className="header__icon material-icons">battery_full</span>
        </span>
    </div>)
}

export default Header;
