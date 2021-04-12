import React from 'react'
import { Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from 'next/link';
import { LogoutButton } from '../../Authentication/LogoutButton';

export const ProfileHeader = ({user}) => {
    return (
        <div style={{ padding: "5px" }}>
            <div
              style={{
                display: "flex",
                minWidth: "250px",
                padding: "0 0 10px",
                textAlign: "start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                }}
              >
                {typeof user?.picture ? (
                  <Avatar
                    src={user?.picture}
                    alt={user?.name}
                    style={{ height: "30px", width: "30px" }}
                  />
                ) : (
                  <AccountCircleIcon />
                )}
              </div>
              <div>
                <p style={{ margin: "0", fontSize: "0.875rem" }}>
                  {user?.name}
                </p>
                <p style={{ margin: "0", fontSize: "0.875rem", color: "gray" }}>
                  {user?.email}
                </p>
              </div>
            </div>
            <div
              style={{ width: "100%", textAlign: "start", padding: "0 10px" }}
            >
              <Link
                className="link"
                href="/profile"
                style={{ textAlign: "start" }}
              >
                Profile
              </Link>
            </div>

            <hr style={{ margin: "5px 0 0" }} />
            <LogoutButton textStart={true} />
          </div>
    )
}
