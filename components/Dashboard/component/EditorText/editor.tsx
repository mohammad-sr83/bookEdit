import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button, Dialog, DialogContent, useTheme } from "@mui/material";
import { Slide } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
// @ts-ignore
import ImageResize from "quill-image-resize";
// @ts-ignore
import QuillBetterTable from "quill-better-table";

Quill.register("modules/better-table", QuillBetterTable);

Quill.register("modules/imageResize", ImageResize);

const Font = Quill.import("formats/font") as any;
Font.whitelist = ["iranyekan"];
Quill.register(Font, true);

interface UploadFileFormProps {
  setvalue: (date: Partial<any>) => void;
  value?: string;
  fild: string;
}

const Editor: React.FC<UploadFileFormProps> = ({ setvalue, fild, value }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const dialogEditorRef = useRef<HTMLDivElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef<Quill | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
           [
              { header: "1" },
              { header: "2" },
              { header: "3" },
              { header: "4" },
               { header: "5" },
            ],
            [{ font: ["iranyekan", "sans-serif"] },],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
            ["link"],
            ["image"],
            [{ direction: "rtl" }],
            ["blockquote"],
            ["clean"],
            [{ table: "insert" }],
            ['custom']
          ],
          "better-table": {
            operationMenu: {
              items: {
                unmergeCells: {
                  text: "Another unmerge cells name",
                },
              },
              color: {
                colors: ["green", "red", "yellow", "blue", "white"],
                text: "Background Colors:",
              },
            },
          },
          imageResize: { modules: ["Resize", "DisplaySize", "Toolbar"] },
        },
      });
    }

    if (quillRef.current && value) {
      quillRef.current.root.innerHTML = value;
    }

    const quill = quillRef.current;

    quill?.on("text-change", () => {
      const content = quill.root.innerHTML;
      setvalue({ [fild]: content });
    });

    const detectLanguage = (text: string) => {
      const isPersian = /[\u0600-\u06FF]/.test(text);
      setIsRTL(isPersian);
    };

    quill?.on("text-change", () => {
      const text = quill?.getText() || "";
      detectLanguage(text);
    });

    return () => {
      quill?.off("text-change", () => {
        const content = quill.root.innerHTML;
        setvalue({ [fild]: content });
      });
    };
  }, [fild, setvalue, value]);

  useEffect(() => {
    if (isFullScreen && dialogEditorRef.current) {
      const quill = new Quill(dialogEditorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [
              { header: "1" },
              { header: "2" },
              { header: "3" },
              { header: "4" },
               { header: "5" },
            ],
            [{ font: ["iranyekan", "sans-serif"] },],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
            [{ direction: "rtl" }],
            ["link"],
            ["image"],
            ["blockquote"],
            ["clean"],
            [{ table: "insert" }],
          ],
          "better-table": {
            operationMenu: {
              items: {
                unmergeCells: {
                  text: "Another unmerge cells name",
                },
              },
              color: {
                colors: ["green", "red", "yellow", "blue", "white"],
                text: "Background Colors:",
              },
            },
          },
          imageResize: {
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
      });

      quill.root.innerHTML = editorContent;

      quill.on("text-change", () => {
        const content = quill.root.innerHTML;
        if (editorContent) {
          setvalue({ [fild]: editorContent });
        } else {
          setEditorContent(content);
          setvalue({ [fild]: content });
        }
      });

      return () => {
        quill.off("text-change");
      };
    }
  }, [isFullScreen, editorContent, fild, setvalue]);

  const handleModalOpen = () => {
    setIsFullScreen(true);
  };

  const handleModalClose = () => {
    setIsFullScreen(false);
  };

  return (
    <div
      className={theme.palette.mode === "dark" ? "dark-theme" : "light-theme"}
    >
      <Button variant="outlined" onClick={handleModalOpen}>
        {isFullScreen ? "بازگشت به حالت معمول" : "تمام صفحه"}
      </Button>

      <div
        ref={editorRef}
        style={{
          height: isFullScreen ? "100vh" : "200px",
          border: "1px solid #ccc",
          width: isFullScreen ? "100%" : "auto",
          direction: isRTL ? "rtl" : "ltr",
        }}
      />

      <Dialog
        open={isFullScreen}
        onClose={handleModalClose}
        fullScreen
        slots={{ transition: Slide }}
        slotProps={{
          transition: {
            onEntered: () => {
              if (dialogEditorRef.current) {
                const quill = new Quill(dialogEditorRef.current!, {
                  theme: "snow",
                  modules: {
                    toolbar: [
                       [
              { header: "1" },
              { header: "2" },
              { header: "3" },
              { header: "4" },
               { header: "5" },
            ],
            [{ font: ["iranyekan", "sans-serif"] },],
                      [{ size: ["small", false, "large", "huge"] }],
                      [{ color: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                      [{ direction: "rtl" }, { direction: "ltr" }],
                      ["link"],
                      ["image"],
                      ["blockquote"],
                      ["clean"],
                      [{ table: "insert" }],
                    ],
                    imageResize: {
                      modules: ["Resize", "DisplaySize", "Toolbar"],
                    },
                  },
                });
                if (value) {
                  quill.root.innerHTML = value;
                }

                quill.on("text-change", () => {
                  const content = quill.root.innerHTML;
                  setvalue({ [fild]: content });
                });
              }
            },
          },
        }}
      >
        <DialogContent
          className={
            theme.palette.mode === "dark" ? "dark-theme" : "light-theme"
          }
        >
          <div
            ref={dialogEditorRef}
            style={{
              direction: isRTL ? "rtl" : "ltr",
              border: "1px solid #ccc",
              height: "90%",
              width: "100%",
            }}
          />
          <Button
            className="absolute bottom-1 left-1"
            onClick={handleModalClose}
          >
            بستن
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;
