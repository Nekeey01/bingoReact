import React from "react";
import {
    Link,
    List,
    ListItem,
} from "@mui/material";

export default function Footer() {
    return (
        <div>
            <List display='flex'>
                <ListItem
                    me={{
                        base: "20px",
                        md: "44px",
                    }}>
                    <Link
                        fontWeight='500'
                        color='#nnn'
                        href='mailto:hello@simmmple.com'>
                        Support
                    </Link>
                </ListItem>
            </List>
        </div>
    );
}