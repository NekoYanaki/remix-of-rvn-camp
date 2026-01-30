import React, { useState } from "react";
import { Sun, Moon, RotateCcw, Play, Images } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GalleryTabsProps {
  images: {
    main: string;
    view360?: string;
    productImages: string[];
    floorPlan: {
      day: string;
      night: string;
    };
    video?: string;
  };
  name: string;
}

const GalleryTabs = ({ images, name }: GalleryTabsProps) => {
  const [activeTab, setActiveTab] = useState("360");
  const [floorPlanMode, setFloorPlanMode] = useState<"day" | "night">("day");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const openVideoModal = (url: string) => {
    setActiveVideoUrl(url);
    setShowVideoModal(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Images className="h-5 w-5 text-primary" />
        แกลเลอรี่
      </h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex overflow-x-auto gap-1 py-1 scrollbar-hide">
          <TabsList className="bg-transparent p-0 h-auto gap-1">
            {images.view360 && (
              <TabsTrigger
                value="360"
                className="px-4 py-2.5 text-sm font-medium bg-transparent border-0 shadow-none text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:shadow-none rounded-lg whitespace-nowrap transition-colors"
              >
                360°
              </TabsTrigger>
            )}
            <TabsTrigger
              value="floorplan"
              className="px-4 py-2.5 text-sm font-medium bg-transparent border-0 shadow-none text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:shadow-none rounded-lg whitespace-nowrap transition-colors"
            >
              Floor Plan
            </TabsTrigger>
            {images.video && (
              <TabsTrigger
                value="video"
                className="px-4 py-2.5 text-sm font-medium bg-transparent border-0 shadow-none text-muted-foreground hover:text-primary hover:bg-primary/5 data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:shadow-none rounded-lg whitespace-nowrap transition-colors"
              >
                วิดีโอ
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        {/* 360° View - YouTube Embed */}
        {images.view360 && (
          <TabsContent value="360" className="mt-4">
            <div
              className="aspect-[16/9] rounded-xl overflow-hidden bg-muted relative cursor-pointer group"
              onClick={() => openVideoModal(images.view360!)}
            >
              <img
                src={images.main}
                alt="360° thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <RotateCcw className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                ดู 360° รอบคัน
              </div>
            </div>
          </TabsContent>
        )}

        {/* Floor Plan */}
        <TabsContent value="floorplan" className="mt-4">
          <div className="space-y-4">
            {/* Day/Night Toggle */}
            <div className="flex justify-start">
              <div className="inline-flex bg-muted/50 rounded-full p-1">
                <button
                  onClick={() => setFloorPlanMode("day")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    floorPlanMode === "day"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  กลางวัน
                </button>
                <button
                  onClick={() => setFloorPlanMode("night")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    floorPlanMode === "night"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  กลางคืน
                </button>
              </div>
            </div>
            
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted">
              <img
                src={floorPlanMode === "day" ? images.floorPlan.day : images.floorPlan.night}
                alt={`Floor Plan - ${floorPlanMode}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </TabsContent>

        {/* Video */}
        {images.video && (
          <TabsContent value="video" className="mt-4">
            <div
              className="aspect-[16/9] rounded-xl overflow-hidden bg-muted relative cursor-pointer group"
              onClick={() => openVideoModal(images.video!)}
            >
              <img
                src={images.main}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 md:h-8 md:w-8 text-primary ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                ดูวิดีโอแนะนำ
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none rounded-2xl overflow-hidden">
          <DialogTitle className="sr-only">วิดีโอ {name}</DialogTitle>
          {activeVideoUrl && getYouTubeId(activeVideoUrl) && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(activeVideoUrl)}?rel=0&autoplay=1&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryTabs;
