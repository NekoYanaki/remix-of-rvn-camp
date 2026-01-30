import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  RotateCcw,
  Play,
  Camera,
  Layout,
  Film,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PremiumGalleryProps {
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

const PremiumGallery = ({ images, name }: PremiumGalleryProps) => {
  const [activeTab, setActiveTab] = useState("photos");
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [floorPlanMode, setFloorPlanMode] = useState<"day" | "night">("day");
  const [showVideoModal, setShowVideoModal] = useState(false);

  // All photos for lightbox
  const allPhotos = [images.main, ...images.productImages];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-4">
      {/* Hero Image - Large cinematic display */}
      <div
        className="relative aspect-[21/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden cursor-pointer group"
        onClick={() => openLightbox(0)}
      >
        <img
          src={images.main}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        
        {/* Photo count badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openLightbox(0);
          }}
          className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-white transition-colors flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          ดูรูปทั้งหมด ({allPhotos.length})
        </button>
      </div>

      {/* Media Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 bg-muted/50 p-1 h-auto rounded-full">
          <TabsTrigger
            value="photos"
            className="rounded-full py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Camera className="h-4 w-4 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">รูปภาพ</span>
          </TabsTrigger>
          {images.view360 && (
            <TabsTrigger
              value="360"
              className="rounded-full py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <RotateCcw className="h-4 w-4 mr-1.5 md:mr-2" />
              <span className="hidden sm:inline">360°</span>
            </TabsTrigger>
          )}
          <TabsTrigger
            value="floorplan"
            className="rounded-full py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Layout className="h-4 w-4 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">Floor Plan</span>
          </TabsTrigger>
          {images.video && (
            <TabsTrigger
              value="video"
              className="rounded-full py-2.5 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Film className="h-4 w-4 mr-1.5 md:mr-2" />
              <span className="hidden sm:inline">วิดีโอ</span>
            </TabsTrigger>
          )}
        </TabsList>

        {/* Photos Grid */}
        <TabsContent value="photos" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {allPhotos.slice(1, 5).map((photo, idx) => (
              <div
                key={idx}
                className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(idx + 1)}
              >
                <img
                  src={photo}
                  alt={`${name} ${idx + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* 360° View */}
        {images.view360 && (
          <TabsContent value="360" className="mt-4">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted">
              <img
                src={images.view360}
                alt={`${name} - 360° View`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
                  ลากเพื่อหมุนชมรอบคัน
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {/* Floor Plan */}
        <TabsContent value="floorplan" className="mt-4">
          <div className="space-y-4">
            {/* Day/Night Toggle */}
            <div className="flex justify-center">
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
              onClick={() => setShowVideoModal(true)}
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
              <p className="absolute bottom-4 left-4 text-white text-sm font-medium">
                คลิกเพื่อดูวิดีโอ
              </p>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition-colors z-10 p-2"
            >
              <X className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors z-10 p-2"
                >
                  <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors z-10 p-2"
                >
                  <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
                </button>
              </>
            )}

            <img
              src={allPhotos[lightboxIndex]}
              alt={`${name} ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {/* Progress indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {allPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === lightboxIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none rounded-2xl overflow-hidden">
          <DialogTitle className="sr-only">วิดีโอ {name}</DialogTitle>
          {images.video && getYouTubeId(images.video) && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(images.video)}?rel=0&autoplay=1&mute=1`}
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

export default PremiumGallery;
