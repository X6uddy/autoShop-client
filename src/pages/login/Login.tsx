import { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import { Context } from '../../main';

const Login: FC = () => {
    const {store} = useContext(Context);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
        <Grid 
            sx={{
                height: '100vh',
                width: '100hv',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Box component="div" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            mt: 2
                        }}
                    >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => store.login(email, password)}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => store.registration(email, password)}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
}
export default observer(Login);