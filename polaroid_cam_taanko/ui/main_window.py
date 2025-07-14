import tkinter as tk
from tkinter import messagebox
from PIL import ImageTk, Image
import cv2
from core.camera_handler import CameraHandler
from core.frame_designer import FrameDesigner
from core.filter_engine import FilterEngine

class SnapQueenApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Polaroid Cam 👑 by Taanko")
        self.cam = CameraHandler()
        self.designer = FrameDesigner()
        self.filter = FilterEngine()

        self.video_label = tk.Label(root)
        self.video_label.pack()

        btn_frame = tk.Frame(root)
        btn_frame.pack(pady=10)

        self.capture_btn = tk.Button(btn_frame, text="📸 Capture", command=self.capture)
        self.capture_btn.grid(row=0, column=0, padx=10)

        self.strip_btn = tk.Button(btn_frame, text="📸 4-Strip", command=self.capture_strip)
        self.strip_btn.grid(row=0, column=1, padx=10)

        self.filter_btn = tk.Button(btn_frame, text="🎨 Filter", command=self.change_filter)
        self.filter_btn.grid(row=0, column=2, padx=10)

        self.update()

    def update(self):
        frame = self.cam.get_frame()
        filtered = self.filter.apply(frame)
        img = Image.fromarray(cv2.cvtColor(filtered, cv2.COLOR_BGR2RGB))
        imgtk = ImageTk.PhotoImage(image=img)
        self.video_label.imgtk = imgtk
        self.video_label.configure(image=imgtk)
        self.root.after(10, self.update)

    def capture(self):
        # Original single capture
        frame = self.cam.get_frame()
        filtered = self.filter.apply(frame)
        polaroid = self.designer.create_polaroid(filtered)
        result = messagebox.askyesno("Save?", "Do you want to save this moment?")
        if result:
            path = self.designer.save_polaroid(polaroid, "./saved_pics")
            print(f"Saved to {path}")

    def capture_strip(self):
        # New photostrip capture
        frames = []
        for i in range(4):
            frame = self.cam.get_frame()
            filtered = self.filter.apply(frame)
            frames.append(filtered)
            cv2.waitKey(500)  # Wait for poses

        strip = self.designer.create_photostrip(frames)
        result = messagebox.askyesno("Save?", "Save this photostrip?")
        if result:
            path = self.designer.save_polaroid(strip, "./saved_pics")
            print(f"Saved strip to {path}")

    def change_filter(self):
        current = self.filter.switch_filter()
        print(f"Switched to filter: {current}")
 