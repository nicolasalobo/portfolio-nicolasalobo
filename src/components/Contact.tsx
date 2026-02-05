"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Contact({ dict }: { dict: any }) {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Custom MUI theme to match Tailwind colors
    const theme = createTheme({
        palette: {
            mode: 'dark', // We can make this dynamic later
            primary: {
                main: '#7c3aed', // Violet 600
            },
            secondary: {
                main: '#06b6d4', // Cyan 500
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                            '&:hover fieldset': {
                                borderColor: '#7c3aed',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#7c3aed',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputBase-input': {
                            color: '#fff',
                        },
                    },
                },
            },
        },
    });

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Replace these with your actual EmailJS Service ID, Template ID, and Public Key
        // For now, we simulate a success after 2 seconds if keys are missing
        const serviceId = "YOUR_SERVICE_ID";
        const templateId = "YOUR_TEMPLATE_ID";
        const publicKey = "YOUR_PUBLIC_KEY";

        if (serviceId === "YOUR_SERVICE_ID") {
            setTimeout(() => {
                setStatus("success");
                setOpenSnackbar(true);
                if (form.current) form.current.reset();
            }, 1500);
            return;
        }

        if (form.current) {
            emailjs.sendForm(serviceId, templateId, form.current, publicKey)
                .then((result) => {
                    setStatus("success");
                    setOpenSnackbar(true);
                    if (form.current) form.current.reset();
                }, (error) => {
                    setStatus("error");
                    setOpenSnackbar(true);
                });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <section id="contact" className="py-24 bg-background">
                <div className="container max-w-2xl">
                    <h2 className="text-4xl font-bold mb-12 text-center text-primary">{dict.contact.title}</h2>

                    <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6 bg-card-bg p-8 rounded-2xl border border-card-border shadow-lg">
                        <TextField
                            label="Name"
                            name="user_name"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            name="user_email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            label="Message"
                            name="message"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={status === "loading"}
                            sx={{
                                mt: 2,
                                bgcolor: 'var(--primary)',
                                '&:hover': { bgcolor: 'var(--primary-hover)' },
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}
                        >
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </Button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-xl text-foreground opacity-80">
                            Or email me directly at: <a href="mailto:contact@nicolaslobo.com" className="text-primary font-bold hover:underline">contact@nicolaslobo.com</a>
                        </p>
                    </div>

                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                        <Alert onClose={() => setOpenSnackbar(false)} severity={status === "success" ? "success" : "error"} sx={{ width: '100%' }}>
                            {status === "success" ? "Message sent successfully!" : "Failed to send message. Please try again."}
                        </Alert>
                    </Snackbar>
                </div>
            </section>
        </ThemeProvider>
    );
}
