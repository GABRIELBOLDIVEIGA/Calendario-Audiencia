import React from 'react'
import RainbowLoader from "components/RainbowLoader";
import CubeLoading from "components/CubeLoading";
import ComposeLoading from "components/ComposeLoading";
import LoadingRainbowlBar from "components/LoadingRainbowlBar";
import DarkBlobLoader from "components/DarkBlobLoader";
import { useEffect } from 'react';
import { useState } from 'react';
import HamsterLoader from 'components/HamsterLoader';
import AstronautLoader from 'components/AstronautLoader';

export default function RandomLoader() {
    const [component, setComponent] = useState(<></>);

    useEffect(() => {
        const array = [
            <RainbowLoader />,
            <CubeLoading />,
            <LoadingRainbowlBar />,
            <ComposeLoading />,
            <DarkBlobLoader />,
            <HamsterLoader />,
            <AstronautLoader />
        ];

        const numeroRandomico = Math.floor(Math.random() * array.length)

        setComponent(array[numeroRandomico])

    }, [])

    return (
        <>
            {component}
        </>
    )
}
