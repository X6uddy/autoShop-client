import { Box, Button } from "@mui/material";
import { LogOut, MailWarningIcon, Verified } from "lucide-react";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../main";


const Header: FC = () => {
    const {store} = useContext(Context);
    return (
        <div>
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '4rem',
                    width: '100hv',
                    color: '#fff',
                    ":last-child": {mx: 'auto'}
                }}
            >
                <Box
                    sx={{
                        width: '450px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        mx: 'auto'
                    }}
                >
                    <Link to={'/autoparts'} style={{textDecoration: 'none', color: '#fff', fontSize: '20px'} }>Запчасти</Link>

                    {store.user.roles.find(role => role === 'USER') && <Link to={'/orders'} style={{textDecoration: 'none', color: '#fff', fontSize: '20px'}}>Клиенты</Link>}

                    <Link to={'/about'} style={{textDecoration: 'none', color: '#fff', fontSize: '20px'}}>О компании</Link>

                    <Link to={'/basket'} style={{textDecoration: 'none', color: '#fff', fontSize: '20px'}}>Корзина</Link>
                </Box>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    right: '0',
                    top: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#fff'
                }}
            >
                <Button 
                    onClick={() => store.logout()} 
                    style={{marginLeft: '20px', color: '#fff'}}
                >
                    <LogOut/>
                </Button>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    left: '15px',
                    top: '23px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#fff'
                }}
            >
                <Link 
                    to={`/orders/:${store.user.id}`}
                    style={{textDecoration: 'none', color: '#fff'}}
                >
                    {store.user.email}
                </Link>

                {!store.user.isActivated ? <MailWarningIcon/> : <Verified/>}
            </Box>
            <Box
                sx={{
                    backgroundColor: 'red',
                    p: '5px'
                }}
            >
                {store.user.isActivated ? 'Аккаунт подтвержден по почте' : `На адрес ${store.user.email} отправлено письмо для подтверждения аккаунта`}
            </Box>
        </div>
    )
}
export default Header