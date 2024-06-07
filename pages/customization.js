// importing layout
import Layout from '@/components/Layout';
// importing axios
import axios from 'axios';
// importing useEffect useState
import { useEffect, useState } from "react";

export default function Customization({
    _id, bannerText: existingBannerText, bannerColor: existingBannerColor,
    mainColor: existingMainColor, secondaryColor: existingSecondaryColor,
    heroImage: existingHeroImage, accentColor: existingAccentColor,
    fontFamily: existingFontFamily, fontSize: existingFontSize, textColor: existingTextColor,
    buttonColor: existingButtonColor, buttonText: existingButtonText,
    logoImage: existingLogoImage, backgroundImage: existingBackgroundImage,
    metaTitle: existingMetaTitle, metaDescription: existingMetaDescription, metaKeywords: existingMetaKeywords,
    facebookLink: existingFacebookLink, twitterLink: existingTwitterLink, instagramLink: existingInstagramLink,
    footerText: existingFooterText, customCSS: existingCustomCSS
}) {
    const [bannerText, setBannerText] = useState(existingBannerText || '');
    const [bannerColor, setBannerColor] = useState(existingBannerColor || '');
    const [mainColor, setMainColor] = useState(existingMainColor || '');
    const [secondaryColor, setSecondaryColor] = useState(existingSecondaryColor || '');
    const [heroImage, setHeroImage] = useState(existingHeroImage || '');
    const [accentColor, setAccentColor] = useState(existingAccentColor || '');
    const [fontFamily, setFontFamily] = useState(existingFontFamily || '');
    const [fontSize, setFontSize] = useState(existingFontSize || '');
    const [textColor, setTextColor] = useState(existingTextColor || '');
    const [buttonColor, setButtonColor] = useState(existingButtonColor || '');
    const [buttonText, setButtonText] = useState(existingButtonText || '');
    const [logoImage, setLogoImage] = useState(existingLogoImage || '');
    const [backgroundImage, setBackgroundImage] = useState(existingBackgroundImage || '');
    const [metaTitle, setMetaTitle] = useState(existingMetaTitle || '');
    const [metaDescription, setMetaDescription] = useState(existingMetaDescription || '');
    const [metaKeywords, setMetaKeywords] = useState(existingMetaKeywords || '');
    const [facebookLink, setFacebookLink] = useState(existingFacebookLink || '');
    const [twitterLink, setTwitterLink] = useState(existingTwitterLink || '');
    const [instagramLink, setInstagramLink] = useState(existingInstagramLink || '');
    const [footerText, setFooterText] = useState(existingFooterText || '');
    const [customCSS, setCustomCSS] = useState(existingCustomCSS || '');

    async function saveCustomization(ev) {
        ev.preventDefault();

        const data = {
            bannerText,
            bannerColor,
            mainColor,
            secondaryColor,
            heroImage,
            accentColor,
            fontFamily,
            fontSize,
            textColor,
            buttonColor,
            buttonText,
            logoImage,
            backgroundImage,
            metaTitle,
            metaDescription,
            metaKeywords,
            facebookLink,
            twitterLink,
            instagramLink,
            footerText,
            customCSS,
        };

        try {
            if (_id) {
                await axios.put("/api/customization", { ...data, _id });
            } else {
                await axios.post("/api/customization", data);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

    return (
        <Layout>
            <form onSubmit={saveCustomization} className="w-full h-auto p-4 gap-5 flex flex-col items-center justify-start">
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Banner Text</h3>
                    <input
                        value={bannerText}
                        onChange={(ev) => setBannerText(ev.target.value)}
                        placeholder='Text for the banner' type='text' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Banner Color</h3>
                    <input
                        value={bannerColor}
                        onChange={(ev) => setBannerColor(ev.target.value)}
                        placeholder='Color for the website' type='color' className='w-full  h-[5rem]' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Main Color</h3>
                    <input
                        value={mainColor}
                        onChange={(ev) => setMainColor(ev.target.value)}
                        placeholder='Main color for the website' type='color' className='w-full  h-[5rem]' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Secondary Color</h3>
                    <input
                        value={secondaryColor}
                        onChange={(ev) => setSecondaryColor(ev.target.value)}
                        placeholder='Secondary color for the website' type='color' className='w-full h-[5rem]' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Accent Color</h3>
                    <input
                        value={accentColor}
                        onChange={(ev) => setAccentColor(ev.target.value)}
                        placeholder='Accent color for the website' type='color' className='w-full  h-[5rem]' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Font Family - Need to have some documentation on this.</h3>
                    <input
                        value={fontFamily}
                        onChange={(ev) => setFontFamily(ev.target.value)}
                        placeholder='Font family for the website' type='text' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Font Size - Need to have some documentation on this.</h3>
                    <input
                        value={fontSize}
                        onChange={(ev) => setFontSize(ev.target.value)}
                        placeholder='Font size for the website' type='text' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Text Color - Need to have some documentation on this.</h3>
                    <input
                        value={textColor}
                        onChange={(ev) => setTextColor(ev.target.value)}
                        placeholder='Text color for the website' type='color' className='w-full h-[5rem]' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Button Color - Need to have some documentation on this.</h3>
                    <input
                        value={buttonColor}
                        onChange={(ev) => setButtonColor(ev.target.value)}
                        placeholder='Button color for the website' type='color' className='w-full h-[5rem]' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Button Text - Need to have some documentation on this.</h3>
                    <input
                        value={buttonText}
                        onChange={(ev) => setButtonText(ev.target.value)}
                        placeholder='Button text for the website' type='text' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Logo Image</h3>
                    <input
                        onChange={(ev) => setLogoImage(ev.target.files[0])}
                        placeholder='Logo image for the website' type='file' className='w-full  h-[5rem]' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Background Image</h3>
                    <input
                        onChange={(ev) => setBackgroundImage(ev.target.files[0])}
                        placeholder='Background image for the website' type='file' className='w-full  h-[5rem]' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Meta Title - Need to have some documentation on this.</h3>
                    <input
                        value={metaTitle}
                        onChange={(ev) => setMetaTitle(ev.target.value)}
                        placeholder='Meta title for the website' type='text' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Meta Description - Need to have some documentation on this.</h3>
                    <input
                        value={metaDescription}
                        onChange={(ev) => setMetaDescription(ev.target.value)}
                        placeholder='Meta description for the website' type='text' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Meta Keywords - Need to have some documentation on this.</h3>
                    <input
                        value={metaKeywords}
                        onChange={(ev) => setMetaKeywords(ev.target.value)}
                        placeholder='Meta keywords for the website' type='text' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Facebook Link</h3>
                    <input
                        value={facebookLink}
                        onChange={(ev) => setFacebookLink(ev.target.value)}
                        placeholder='Facebook link for the website' type='url' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Twitter Link</h3>
                    <input
                        value={twitterLink}
                        onChange={(ev) => setTwitterLink(ev.target.value)}
                        placeholder='Twitter link for the website' type='url' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Instagram Link</h3>
                    <input
                        value={instagramLink}
                        onChange={(ev) => setInstagramLink(ev.target.value)}
                        placeholder='Instagram link for the website' type='url' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Footer Text - Need to have some documentation on this.</h3>
                    <input
                        value={footerText}
                        onChange={(ev) => setFooterText(ev.target.value)}
                        placeholder='Footer text for the website' type='text' />
                </div>
                <div className='w-full lg:w-1/3 flex flex-col gap-3'>
                    <h3 className='font-bold uppercase'> Custom CSS - Need to have some documentation on this.</h3>
                    <textarea
                        value={customCSS}
                        onChange={(ev) => setCustomCSS(ev.target.value)}
                        placeholder='Custom CSS for the website' className='w-full h-[10rem]' />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white font-bold py-2 px-4 rounded mt-4 w-full"
                >
                    Save
                </button>
            </form>
        </Layout>
    );
}
