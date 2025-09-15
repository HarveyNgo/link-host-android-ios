"use client";

import { useState, useEffect } from "react";

interface PageProps {
  params: Promise<{ key: string }>;
}

export default async function OpenDeepLinkPage({ params }: PageProps) {
  const { key } = await params;

  // You can't use hooks in async components, so move logic to a client component:
  return <OpenDeepLinkClient keyValue={key} />;
}

function OpenDeepLinkClient({ keyValue }: { keyValue: string }) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  console.log("hung isAndroid:", isAndroid);
  console.log("hung isIOS:", isIOS);

  useEffect(() => {
    if (isAndroid) {
      window.location.href = `b3well-patient-development://login?url="https://accounts.development.b3well.com/realms/b3well/login-actions/action-token?key=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFncU52azJUU1o0YWRhWndnT3Y3UDJMenpqa3ZLdnRDLUR0am9fazBxb00ifQ.eyJqdGkiOiI3YmMzNGU1ZS03NzY5LTRkZWEtOTQwOC1mYjZkNDA3ZTZmYmUiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmRldmVsb3BtZW50LmIzd2VsbC5jb20vcmVhbG1zL2Izd2VsbCIsImF1ZCI6Imh0dHBzOi8vYWNjb3VudHMuZGV2ZWxvcG1lbnQuYjN3ZWxsLmNvbS9yZWFsbXMvYjN3ZWxsIiwic3ViIjoiNGE4MzNmNjktMmU0Yy00MTM1LTgxMTAtY2ViZGRkODMwNzgwIiwidHlwIjoiZXhlY3V0ZS1hY3Rpb25zIiwiYXpwIjoicGF0aWVudC1wb3J0YWwiLCJub25jZSI6IjRjYTE4OTk2LWI3NzgtNDhiYi05NTQ5LTM2ZDBlMDc0NzAyZSIsImVtbCI6ImNyYXlvdHR1bm5vdXBwby0yODI2QHlvcG1haWwuY29tIiwicnFhYyI6WyJVUERBVEVfUEFTU1dPUkQiXSwiaWF0IjoxNzU2MDk2OTkxLCJyZWR1cmkiOiJiM3dlbGwtcGF0aWVudC1kZXZlbG9wbWVudDovL2xvZ2luP3N0YXR1cz1kb25lIiwiZXhwIjoxNzU2MTgzMzkxfQ.Q9XD_e-jM5TpPVW1b0IEafNKN3TULn-r0EBFn7AlrHESY778EU2MZXLacQFvhk9D836I0kLUAS_TcTUYJ29oHApOW3iyxzviFuFuBrr8pNYOlP__huT-CdgFxO7spKLYU0vYsVNxjFYvpNemDkCV7t6lUA7V_Nfl2WAavCJl_TkiHxhDvvdcfpNxjN22srnk99Thrg4Ti4tDB2uDMScwXfHlugM4oFSoL0ge0d52JmMl4qLfhPfhrhr-HiDoMuWygxVNEEoW8O_PqhaY1D2d1QZU9gpWAn3E28e1BYnxQJELHSbo2YXQ6V1Pffq9J6GieotqWQog_N_Nc63Rwcow7g&email=crayottunnouppo-2826%40yopmail.com`;
    }
  }, [isAndroid]);

  return (
    <>
      <h1>open deep link test</h1>
    </>
  );
}
