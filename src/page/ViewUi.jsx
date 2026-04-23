import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../BaseUrl';

function ViewUi() {
    const { id, projectType } = useParams();

    const [mode, setMode] = useState("ui"); // ui | html | css | js
    const [copyBtn, setCopyBtn] = useState(false);
    const [project, setProject] = useState(null);
    const [code, setCode] = useState("");

    // ✅ Copy function
    const handleCopy = async () => {
        let text = "";

        if (mode === "ui") {
            text = project?.uiTemplate;
        } else {
            text = code;
        }

        await navigator.clipboard.writeText(text || "");
        setCopyBtn(true);
        setTimeout(() => setCopyBtn(false), 2000);
    };

    // ✅ Fetch code from URL
    const loadCodeFromUrl = async (url) => {
        try {
            if (!url) return;
            const res = await fetch(url);
            const text = await res.text();
            setCode(text);
        } catch (error) {
            console.log(error);
        }
    };

    // ✅ API CALL
    const renderProjectDetals = async () => {
        try {
            const res = await fetch(`${BASE_URL}/render/project/${id}`);
            const data = await res.json();

            if (data.success) {
                setProject(data.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // auto call
    useEffect(() => {
        renderProjectDetals();
    }, [id]);

    return (
        <section className='bg-white pt-20 px-10 min-h-screen'>
            <div className='w-full'>

                {/* Buttons */}
                <div className='flex gap-3 mb-3 bg-gray-700 p-2 sticky top-0 z-10'>

                    {/* UI Button */}
                    <button
                        onClick={() => {
                            setMode("ui");
                            loadCodeFromUrl(project?.uiTemplate);
                        }}
                        className='px-3 py-1 border rounded hover:bg-gray-200'>
                        UI
                    </button>

                    {/* HTML */}
                    {(project?.projectType === "Html-Css" || project?.projectType === "JsCode") && (
                        <button
                            onClick={() => {
                                setMode("html");
                                loadCodeFromUrl(project?.htmlCode);
                            }}
                            className='px-3 py-1 border rounded hover:bg-gray-200'>
                            HTML
                        </button>
                    )}

                    {/* CSS */}
                    {(projectType === "Html-Css") && (
                        <button
                            onClick={() => {
                                setMode("css");
                                loadCodeFromUrl(project?.cssCode);
                            }}
                            className='px-3 py-1 border rounded hover:bg-gray-200'>
                            CSS
                        </button>
                    )}

                    {/* JSX */}
                    {(projectType === "React") && (
                        <button
                            onClick={() => {
                                setMode("js");
                                loadCodeFromUrl(project?.jsxCode);
                            }}
                            className='px-3 py-1 border rounded hover:bg-gray-200'>
                            JSX
                        </button>
                    )}

                    {/* JS */}
                    {(projectType === "jsProject") && (
                        <button
                            onClick={() => {
                                setMode("js");
                                loadCodeFromUrl(project?.jsCode);
                            }}
                            className='px-3 py-1 border rounded hover:bg-gray-200'>
                            JS
                        </button>
                    )}

                    {/* Copy */}
                    <button
                        onClick={handleCopy}
                        className='px-3 py-1 border rounded hover:bg-gray-200'>
                        {copyBtn ? "Copied" : "Copy"}
                    </button>
                </div>

                {/* Render Area */}
                <div className='w-full h-[80vh] border overflow-auto p-3 flex items-center justify-center'>

                    {/* UI Preview */}
                    {mode === "ui" && (
                        <img
                            src={project?.uiTemplate}
                            alt="UI Preview"
                            className="max-w-full max-h-full object-contain"
                        />
                    )}

                    {/* Code View */}
                    {mode !== "ui" && (
                        <div className='w-full h-[80vh] border overflow-auto p-3'>
                            <SyntaxHighlighter
                                language="javascript"
                                style={vscDarkPlus}
                                wrapLongLines={false}
                                showLineNumbers={true}
                                customStyle={{
                                    overflowX: "auto",
                                    fontSize: "14px",
                                }}
                            >
                                {code}
                            </SyntaxHighlighter>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}

export default ViewUi;