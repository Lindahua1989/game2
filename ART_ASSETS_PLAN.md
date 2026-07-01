# 星际尖塔 - 美术资源规划书

## 一、美术风格定义

### 整体风格
- **风格**: 赛博朋克科幻 + 像素/半写实混合风
- **色调**: 深色背景为主，霓虹蓝(#00d4ff)和霓虹紫(#b44aff)为强调色
- **氛围**: 太空飞船内部，金属质感，全息投影，数据流
- **参考**: 《杀戮尖塔》+《Into the Breach》+ 赛博朋克2077 UI风格

### 统一规范
- **背景色**: #0a0a1a ~ #1a1a3e
- **主色调**: 青色(#00d4ff)、紫色(#b44aff)、白色(#e0e0ff)
- **攻击色**: 红色/橙色 (#ff4444 ~ #ff8800)
- **防御色**: 蓝色/青色 (#00d4ff ~ #4488ff)
- **能力色**: 紫色/金色 (#b44aff ~ #ffd700)
- **毒/腐蚀色**: 绿色 (#44ff44 ~ #00cc44)

---

## 二、目录结构

```
assets/
├── backgrounds/          # 背景图
│   ├── title-bg.png/jpg       # 标题画面背景
│   ├── combat-engine.png/jpg  # 战斗背景-引擎层
│   ├── combat-core.png/jpg    # 战斗背景-核心区
│   ├── combat-bridge.png/jpg  # 战斗背景-舰桥
│   ├── map-engine.png/jpg     # 地图背景-引擎层
│   ├── map-core.png/jpg       # 地图背景-核心区
│   ── map-bridge.png/jpg     # 地图背景-舰桥
├── enemies/              # 敌人精灵图
│   ├── normal/              # 普通敌人
│   ├── elite/               # 精英敌人
│   └── boss/                # Boss
├── cards/                # 卡牌插画
│   ├── attack/              # 攻击牌
│   ├── skill/               # 技能牌
│   └── power/               # 能力牌
├── relics/               # 遗物/模块图标
├── events/               # 事件插画
├── ui/                   # UI元素
│   ├── card-frame-attack.png/jpg
│   ├── card-frame-skill.png/jpg
│   ├── card-frame-power.png/jpg
│   ├── node-combat.png/jpg
│   ├── node-elite.png/jpg
│   ├── node-boss.png/jpg
│   ├── node-event.png/jpg
│   ├── node-shop.png/jpg
│   ├── node-rest.png/jpg
│   └── node-treasure.png/jpg
└── player/               # 玩家角色
    ├── player-default.png/jpg
    ├── player-fire.png/jpg
    ├── player-ice.png/jpg
    ├── player-shadow.png/jpg
    ├── player-golden.png/jpg
    └── player-neon.png/jpg
```

---

## 三、资源规格

| 资源类型 | 尺寸(px) | 格式 | 说明 |
|---------|----------|------|------|
| 标题背景 | 1920×1080 | PNG/JPG/JPEG | 全屏背景，CSS cover 自动适配 |
| 战斗背景 | 1920×1080 | PNG/JPG/JPEG | 全屏背景，CSS cover 自动适配 |
| 地图背景 | 1920×1080 | PNG/JPG/JPEG | 全屏背景，CSS cover 自动适配 |
| 敌人精灵(普通) | 128×128 | PNG/JPG/JPEG | 居中，CSS 自动缩放适配分辨率 |
| 敌人精灵(精英) | 192×192 | PNG/JPG/JPEG | 居中，CSS 自动缩放适配分辨率 |
| 敌人精灵(Boss) | 256×256 | PNG/JPG/JPEG | 居中，CSS 自动缩放适配分辨率 |
| 卡牌插画 | 200×140 | PNG/JPG/JPEG | 卡牌中央区域 |
| 遗物图标 | 64×64 | PNG/JPG/JPEG | 方形，圆角可选 |
| 事件插画 | 400×300 | PNG/JPG/JPEG | 事件界面顶部 |
| 地图节点 | 48×48 | PNG/JPG/JPEG | 圆形为主 |
| 玩家角色 | 128×128 | PNG/JPG/JPEG | 战斗界面底部，CSS 自动缩放 |

### 响应式适配说明

游戏已实现自动分辨率适配，支持以下常见分辨率：

| 分辨率 | 敌人精灵尺寸 | 玩家角色尺寸 | 标题字体 |
|--------|-------------|-------------|---------|
| 2560×1440+ | 140×140px | 110×110px | 96px |
| 1920×1080 | 120×120px | 96×96px | 72px |
| 1280×720 | 80×80px | 64×64px | 56px |
| 768px 以下 | 72×72px | 56×56px | 42px |

**背景图**：使用 `background-size: cover` 自动填充屏幕，保持比例裁剪
**精灵图**：CSS 媒体查询自动调整显示尺寸，保持清晰

### 图片生成建议

- **背景图**：生成 1920×1080 即可，系统会自动适配更高分辨率
- **精灵图**：建议生成 256×256 或更高分辨率，缩小显示更清晰
- **格式选择**：
  - 背景图：JPG/JPEG（文件小）
  - 精灵图：PNG（透明背景）或 JPG（不透明）

---

## 四、分批次生成计划

### 🔴 第一批（最高优先级）- 核心视觉

#### 1. 标题画面背景 `backgrounds/title-bg.png`
```
提示词(Prompt):
A dark sci-fi space station interior, massive cylindrical structure stretching into the distance, 
glowing cyan and purple neon lights along the corridors, holographic displays floating in the air, 
stars visible through large observation windows, cyberpunk atmosphere, deep blue and purple color 
palette (#0a0a1a background, #00d4ff cyan accents, #b44aff purple accents), digital art, 
wide cinematic composition, 1920x1080, no text, no characters

尺寸: 1920×1080
保存: assets/backgrounds/title-bg.png
```

#### 2. 战斗背景×3

**引擎层** `backgrounds/combat-engine.png`:
```
提示词(Prompt):
Interior of a massive spaceship engine room, industrial sci-fi setting, large glowing engine cores 
with blue plasma energy, metal walkways and catwalks, steam and particle effects, warning lights 
in orange and red, dark atmosphere with cyan (#00d4ff) and purple (#b44aff) accent lighting, 
cyberpunk style, wide angle view, 1920x1080, no text, no characters, game background art

尺寸: 1920×1080
保存: assets/backgrounds/combat-engine.png
```

**核心区** `backgrounds/combat-core.png`:
```
提示词(Prompt):
Interior of an alien-infested spaceship core section, organic-mechanical hybrid architecture, 
glowing purple bio-mechanical tendrils mixed with metal panels, pulsating energy conduits, 
dark corridors with eerie cyan (#00d4ff) and purple (#b44aff) lighting, cyberpunk horror 
atmosphere, 1920x1080, no text, no characters, game background art

尺寸: 1920×1080
保存: assets/backgrounds/combat-core.png
```

**舰桥** `backgrounds/combat-bridge.png`:
```
提示词(Prompt):
Futuristic spaceship bridge command center, massive holographic displays and control panels, 
large viewport showing outer space with stars and nebulae, advanced AI core glowing in the 
center with purple energy, cyberpunk high-tech atmosphere, cyan (#00d4ff) and purple (#b44aff) 
holographic elements, 1920x1080, no text, no characters, game background art

尺寸: 1920×1080
保存: assets/backgrounds/combat-bridge.png
```

#### 3. 玩家角色×1（先做默认皮肤）

`player/player-default.png`:
```
提示词(Prompt):
Cyberpunk warrior character portrait, front-facing upper body, wearing sleek futuristic armor 
with glowing cyan (#00d4ff) circuit lines, dark blue and purple color scheme, visor helmet 
with glowing blue eye slit, mechanical augmentations on arms, sci-fi soldier style, 
dark background, game sprite style, clean lines, 128x128 pixels, PNG with transparent background

尺寸: 128×128
保存: assets/player/player-default.png
```

---

### 🟡 第二批（高优先级）- 敌人精灵

#### 普通敌人（18种）

每个敌人128×128，PNG透明背景。统一风格：赛博朋克科幻机械/生物。

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `enemies/normal/patrol_drone.png` | 巡逻无人机 | `Small hovering security drone, spherical body with red sensor eye, two small weapon mounts, cyan glowing thrusters, sci-fi military design, dark metal with cyan accents, game sprite, 128x128, transparent background, clean design` |
| 2 | `enemies/normal/infected_bot.png` | 感染机器人 | `Corrupted humanoid robot, glitching with purple virus patterns spreading across its body, one arm converted into a blade, sparking wires, red and purple glowing cracks, cyberpunk zombie robot, game sprite, 128x128, transparent background` |
| 3 | `enemies/normal/mutant.png` | 变异体 | `Alien biological mutant creature, asymmetric body with organic tendrils and mechanical parts fused together, glowing green pustules, multiple eyes, horror sci-fi creature, game sprite, 128x128, transparent background` |
| 4 | `enemies/normal/em_spider.png` | 电磁蛛 | `Mechanical spider with electrical arcs between its legs, metallic blue body, glowing purple joints, 8 sharp legs, small body with large electromagnetic coils, sci-fi robot spider, game sprite, 128x128, transparent background` |
| 5 | `enemies/normal/nano_swarm.png` | 纳米虫群 | `Swarm of tiny nanobots forming a cloud-like entity, individual tiny mechanical insects visible at edges, glowing green core, dark metallic particles, sci-fi nanotech horror, game sprite, 128x128, transparent background` |
| 6 | `enemies/normal/sentry_turret.png` | 哨兵炮台 | `Heavy automated defense turret mounted on a tripod, large plasma cannon barrel glowing orange, red targeting laser, armored base with warning stripes, military sci-fi design, game sprite, 128x128, transparent background` |
| 7 | `enemies/normal/repair_bot.png` | 维修机器人 | `Small friendly-looking maintenance robot with multiple tool arms, welding torch and wrench, blue glowing eyes, rounded body with utility belt, slightly worn and dirty, sci-fi utility robot, game sprite, 128x128, transparent background` |
| 8 | `enemies/normal/laser_trap.png` | 激光陷阱 | `Wall-mounted laser defense system, triangular shape with central red laser emitter, glowing energy conduits, warning lights blinking, security device, sci-fi trap mechanism, game sprite, 128x128, transparent background` |
| 9 | `enemies/normal/data_ghost.png` | 数据幽灵 | `Holographic ghost-like entity made of glitching data streams, translucent blue-purple body, flickering pixels and code fragments, ethereal floating figure with hollow eyes, digital phantom, game sprite, 128x128, transparent background` |
| 10 | `enemies/normal/mech_scorpion.png` | 机械蜘蛛 | `Mechanical scorpion hybrid, armored metallic body with two large pincers, segmented tail with stinger tipped with green poison glow, eight mechanical legs, cyberpunk creature, game sprite, 128x128, transparent background` |
| 11 | `enemies/normal/plasma_elemental.png` | 等离子元素 | `Living plasma entity, humanoid shape made of swirling orange-red energy, molten core visible, crackling electricity around body, intense heat distortion effect, sci-fi energy being, game sprite, 128x128, transparent background` |
| 12 | `enemies/normal/void_walker.png` | 虚空行者 | `Dark shadowy humanoid figure emerging from a dimensional rift, body made of dark matter with purple star-like points of light, cloak of void energy, eerie and mysterious, cosmic horror entity, game sprite, 128x128, transparent background` |
| 13 | `enemies/normal/cyber_assassin.png` | 赛博刺客 | `Sleek cybernetic assassin in crouching combat stance, black and purple armor with red accent lines, dual energy blades, visor with red targeting display, agile and dangerous looking, sci-fi ninja, game sprite, 128x128, transparent background` |
| 14 | `enemies/normal/shield_drone.png` | 护盾无人机 | `Compact hovering drone projecting a hexagonal energy shield, blue force field visible around it, spherical body with shield emitters, defensive posture, sci-fi support unit, game sprite, 128x128, transparent background` |
| 15 | `enemies/normal/venom_spitter.png` | 毒液喷射者 | `Bio-mechanical creature with large acid sacs visible through translucent skin, green toxic liquid dripping from fangs, multiple nozzles on body for spraying poison, grotesque alien design, game sprite, 128x128, transparent background` |
| 16 | `enemies/normal/energy_vampire.png` | 能量吸血鬼 | `Tall slender robotic figure with cape-like energy absorbers, draining blue energy through extended clawed hands, dark red and purple body, gothic sci-fi design, energy siphon tubes, game sprite, 128x128, transparent background` |
| 17 | `enemies/normal/gravity_manipulator.png` | 重力操控者 | `Floating entity surrounded by distorted space, dark purple robes with swirling galaxy patterns, hands manipulating gravity spheres, eyes glowing white, cosmic psionic being, game sprite, 128x128, transparent background` |
| 18 | `enemies/normal/phase_shifter.png` | 相位转换者 | `Flickering humanoid figure partially phased out of reality, body splitting into multiple afterimages, electric blue and purple energy crackling around form, unstable quantum state visual, game sprite, 128x128, transparent background` |

#### 精英敌人（8种）

每个192×192，PNG透明背景。比普通敌人更大更震撼。

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `enemies/elite/mech_warrior.png` | 战斗机甲 | `Massive bipedal combat mech, heavy armor plating in dark gunmetal, dual arm cannons glowing orange, shoulder missile pods, red sensor array, battle-damaged with sparks, imposing war machine, sci-fi mech design, 192x192, transparent background, detailed game sprite` |
| 2 | `enemies/elite/stealth_hunter.png` | 隐形猎手 | `Advanced stealth assassin android, sleek black body with active camouflage panels partially activated creating visual distortion, dual plasma daggers, single red eye visor, deadly and elegant, cyberpunk elite killer, 192x192, transparent background` |
| 3 | `enemies/elite/quantum_mage.png` | 量子法师 | `Robotic sorcerer floating in lotus position, surrounded by orbiting quantum energy spheres, holographic spell circles, robes made of flowing data streams, third eye glowing purple, sci-fi magic user, 192x192, transparent background` |
| 4 | `enemies/elite/heavy_battleship.png` | 重型炮舰 | `Compact hovering warship bristling with weapons, massive front plasma cannon, armored hull with glowing blue engine ports, missile racks on sides, intimidating military vessel, sci-fi gunship, 192x192, transparent background` |
| 5 | `enemies/elite/infection_core.png` | 感染核心 | `Pulsating bio-mechanical mass of corruption, central eye surrounded by tentacles and cables, spreading purple virus veins, spawning small drones from its body, horrifying alien infection source, 192x192, transparent background` |
| 6 | `enemies/elite/time_lord.png` | 时间领主 | `Ancient robotic entity manipulating time itself, clock-like mechanisms integrated into body, hourglass energy core in chest, temporal distortion rings around limbs, wise and powerful, cosmic time keeper, 192x192, transparent background` |
| 7 | `enemies/elite/plasma_titan.png` | 等离子泰坦 | `Colossal fire elemental bound in mechanical containment armor, molten plasma visible through gaps in the armor, burning fists, volcanic energy radiating, overwhelming power, sci-fi titan boss, 192x192, transparent background` |
| 8 | `enemies/elite/void_empress.png` | 虚空女皇 | `Elegant alien queen floating on a throne of dark energy, flowing hair made of cosmic void, crown of purple crystals, commanding gesture with long clawed fingers, regal and terrifying, dark queen of the void, 192x192, transparent background` |

---

### 🟠 第三批（高优先级）- Boss精灵

每个256×256，PNG透明背景。最大最震撼。

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `enemies/boss/guardian_core.png` | 守卫核心 | `Massive fortress-like defensive AI entity, geometric shield-shaped body made of layered armor plates, multiple turret emplacements, central glowing red core eye, energy barriers orbiting around it, imposing immovable guardian, sci-fi boss design, 256x256, transparent background, highly detailed` |
| 2 | `enemies/boss/bug_queen.png` | 虫族女王 | `Gigant bio-mechanical insect queen, massive abdomen pulsating with green energy, laying mechanical eggs, multiple clawed legs, mandibles dripping with acid, wing-like energy projections, hive mind controller, terrifying alien queen boss, 256x256, transparent background, highly detailed` |
| 3 | `enemies/boss/omega_ai.png` | 主控AI·奥米伽 | `Supreme artificial intelligence core, massive floating brain-like structure made of circuit boards and holographic displays, countless data streams flowing into it, three phases represented by color shifts (blue→purple→red), all-seeing digital eye, god-like AI overlord, 256x256, transparent background, highly detailed` |
| 4 | `enemies/boss/mech_dragon.png` | 机械巨龙 | `Enormous mechanical dragon, chrome and dark steel body with glowing purple energy veins, massive wings made of energy fields, plasma breath cannon in jaws, razor-sharp mechanical claws, cyberpunk dragon boss, 256x256, transparent background, highly detailed` |
| 5 | `enemies/boss/core_hub.png` | 核心枢纽 | `The central nexus of the entire ship systems, crystalline structure pulsating with all colors of energy, multiple connected nodes orbiting around a brilliant core, reality-warping distortions, ultimate system core boss, cosmic energy hub, 256x256, transparent background, highly detailed` |

---

### 🟢 第四批（中优先级）- 卡牌插画

每张200×140，PNG格式。统一风格：赛博朋克科幻场景/图标。

#### 攻击牌（红色调边框区域）

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `cards/attack/laser_shot.png` | 激光射击 | `Sci-fi laser beam firing from a futuristic pistol, red energy bolt with motion blur, dark background, cyberpunk weapon art, card game illustration style, 200x140` |
| 2 | `cards/attack/plasma_cannon.png` | 等离子炮 | `Heavy plasma cannon firing a massive orange energy ball, dramatic lighting, sci-fi heavy weapon, explosion effect, card game illustration, 200x140` |
| 3 | `cards/attack/emp_pulse.png` | EMP脉冲 | `Electromagnetic pulse wave expanding outward, blue-white lightning ring, disrupting nearby electronics, sci-fi AOE attack, card game illustration, 200x140` |
| 4 | `cards/attack/nano_repair.png` | 纳米修复 | `Green nanobots repairing damaged armor, healing particles and medical cross symbol, sci-fi healing beam, card game illustration, 200x140` |
| 5 | `cards/attack/rapid_fire.png` | 连射 | `Dual automatic weapons firing rapid tracer rounds, bullet trails with muzzle flash, action-packed sci-fi combat, card game illustration, 200x140` |
| 6 | `cards/attack/radiation_round.png` | 辐射弹 | `Radioactive projectile leaving green toxic trail, hazard symbol, nuclear contamination effect, sci-fi ammo, card game illustration, 200x140` |
| 7 | `cards/attack/em_storm.png` | 电磁风暴 | `Massive lightning storm of electromagnetic energy, purple and blue bolts converging, devastating sci-fi energy attack, card game illustration, 200x140` |
| 8 | `cards/attack/laser_array.png` | 激光阵列 | `Multiple laser beams firing in formation, organized grid of red energy bolts, tactical sci-fi weapon system, card game illustration, 200x140` |
| 9 | `cards/attack/railgun.png` | 磁轨炮 | `Hypersonic railgun firing a devastating slug, electromagnetic rails glowing blue, shockwave effect, ultra-penetration weapon, card game illustration, 200x140` |
| 10 | `cards/attack/energy_siphon.png` | 能量虹吸 | `Energy being drained from target in swirling blue-purple vortex, power absorption effect, sci-fi siphoning visual, card game illustration, 200x140` |
| 11 | `cards/attack/precision_strike.png` | 精准打击 | `Crosshair targeting system locked on target, armor-piercing round bypassing shields, tactical HUD overlay, precision sci-fi attack, card game illustration, 200x140` |
| 12 | `cards/attack/plasma_blade.png` | 等离子刃 | `Glowing plasma sword/blade being swung, orange-white energy edge, motion arc trail, sci-fi melee weapon, card game illustration, 200x140` |
| 13 | `cards/attack/chain_lightning.png` | 链式闪电 | `Lightning bolt chaining between multiple targets, electric arcs jumping from one point to another, blue-white electricity, sci-fi chain attack, card game illustration, 200x140` |
| 14 | `cards/attack/self_destruct.png` | 自毁程序 | `Explosive self-destruct sequence, massive detonation with skull warning symbol, sacrifice attack, red warning alerts, card game illustration, 200x140` |
| 15 | `cards/attack/data_overflow.png` | 数据溢出 | `Overwhelming flood of digital data crashing into target, corrupted code streams, system overload visual, matrix-style data attack, card game illustration, 200x140` |
| 16 | `cards/attack/nano_inject.png` | 纳米注入 | `Syringe injecting glowing green nanobots into target, microscopic invasion visual, toxic injection, medical horror, card game illustration, 200x140` |
| 17 | `cards/attack/high_freq.png` | 高频震荡 | `High-frequency vibration waves distorting space around target, sonic attack visual, rippling distortion effect, sci-fi sonic weapon, card game illustration, 200x140` |
| 18 | `cards/attack/destroy_ray.png` | 毁灭射线 | `Massive concentrated death ray beam, pure destructive energy in red-orange, apocalyptic weapon discharge, ultimate attack, card game illustration, 200x140` |
| 19 | `cards/attack/shield_bash.png` | 护盾猛击 | `Energy shield being used as a weapon to slam into enemy, impact shockwave, defensive-offensive move, sci-fi shield bash, card game illustration, 200x140` |
| 20 | `cards/attack/virus_spread.png` | 病毒扩散 | `Computer virus spreading visually as green corrupted code infecting multiple targets, digital plague, biohazard visual, card game illustration, 200x140` |
| 21 | `cards/attack/energy_drain.png` | 能量汲取 | `Life energy being drained as green-red stream flowing from target to attacker, vampiric energy steal, sci-fi drain effect, card game illustration, 200x140` |
| 22 | `cards/attack/burst_shot.png` | 爆裂射击 | `Explosive bullet impact with secondary explosion hitting surrounding targets, fragmentation effect, sci-fi explosive ammo, card game illustration, 200x140` |
| 23 | `cards/attack/lethal_strike.png` | 致命一击 | `Critical hit moment, blade or bullet at point of impact, dramatic slow-motion feel, red critical hit flash, card game illustration, 200x140` |
| 24 | `cards/attack/energy_burst.png` | 能量爆发 | `Energy exploding outward from hand in all directions, raw power release, purple-white energy nova, card game illustration, 200x140` |
| 25 | `cards/attack/plasma_wave.png` | 等离子波 | `Massive wave of plasma energy sweeping across the battlefield, tsunami of orange-blue fire, devastating AOE, card game illustration, 200x140` |

#### 技能牌（蓝色调边框区域）

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `cards/skill/nano_armor.png` | 纳米装甲 | `Nanobots forming protective armor layer around body, hexagonal shield pattern materializing, blue protective field, sci-fi defense, card game illustration, 200x140` |
| 2 | `cards/skill/data_download.png` | 数据下载 | `Holographic data streams being downloaded into a device, information transfer visual, blue digital particles flowing, sci-fi hacking, card game illustration, 200x140` |
| 3 | `cards/skill/quantum_dodge.png` | 量子闪避 | `Figure phasing out of reality to dodge attacks, quantum afterimage effect, blue-purple teleportation trail, evasive maneuver, card game illustration, 200x140` |
| 4 | `cards/skill/energy_overload.png` | 能量过载 | `Energy system overloading with sparks and lightning, dangerous power surge, yellow warning energy, risky power boost, card game illustration, 200x140` |
| 5 | `cards/skill/hologram.png` | 全息投影 | `Holographic decoy projection appearing, translucent blue duplicate image, deception technology, sci-fi hologram, card game illustration, 200x140` |
| 6 | `cards/skill/system_reboot.png` | 系统重启 | `System reboot sequence, circular loading animation, digital refresh effect, blue scanning lines, tech recovery visual, card game illustration, 200x140` |
| 7 | `cards/skill/pulse_barrier.png` | 脉冲屏障 | `Pulsing energy barrier expanding outward, layered hexagonal shield, blue protective dome, sci-fi force field, card game illustration, 200x140` |
| 8 | `cards/skill/tactical_scan.png` | 战术扫描 | `Radar scanning sweep with tactical data overlay, targeting analysis HUD, blue scan lines revealing information, military tech, card game illustration, 200x140` |
| 9 | `cards/skill/reflect_shield.png` | 反射护盾 | `Mirror-like energy shield reflecting incoming attacks, bouncing projectiles, prismatic reflection effect, defensive counter, card game illustration, 200x140` |
| 10 | `cards/skill/emergency_repair.png` | 紧急修复 | `Emergency medical nanobots repairing damage, green healing cross, rapid restoration visual, sci-fi first aid, card game illustration, 200x140` |
| 11 | `cards/skill/energy_convert.png` | 能量转换 | `Energy being converted from one form to another, yellow power transforming into blue shield, alchemical transformation visual, card game illustration, 200x140` |
| 12 | `cards/skill/quantum_entangle.png` | 量子纠缠 | `Two quantum particles linked by energy threads, entangled state visualization, purple-blue connected particles, physics phenomenon, card game illustration, 200x140` |
| 13 | `cards/skill/gravity_field.png` | 重力场 | `Gravity distortion field slowing down enemies, warped space visual, purple gravitational lensing effect, area control, card game illustration, 200x140` |
| 14 | `cards/skill/energy_pulse.png` | 能量脉冲 | `Quick burst of energy from core, small electrical discharge, yellow-blue power pulse, energy recharge visual, card game illustration, 200x140` |
| 15 | `cards/skill/photon_shield.png` | 光子护盾 | `Brilliant photon-based shield glowing bright blue-white, intense protective light barrier, maximum defense visual, card game illustration, 200x140` |
| 16 | `cards/skill/time_warp.png` | 时间扭曲 | `Time being bent and warped, clock imagery with distorted spacetime, temporal manipulation visual, extra turn concept, card game illustration, 200x140` |
| 17 | `cards/skill/mirror_image.png` | 镜像分身 | `Creating a mirror copy of self, duplicate forming from light particles, cloning technology visual, sci-fi duplication, card game illustration, 200x140` |
| 18 | `cards/skill/energy_surge.png` | 能量激增 | `Sudden surge of power coursing through systems, energy cards becoming cheaper, lightning-fast power boost, card game illustration, 200x140` |
| 19 | `cards/skill/healing_beam.png` | 治愈光束 | `Soothing green healing beam washing over body, medical restoration field, health regeneration visual, sci-fi healing, card game illustration, 200x140` |
| 20 | `cards/skill/weak_field.png` | 虚弱力场 | `Weakening aura emanating outward, enemies losing strength, purple debilitation field, power drain visual, card game illustration, 200x140` |
| 21 | `cards/skill/shield_wall.png` | 护盾之墙 | `Impenetrable wall of energy shields stacking up, layered blue barriers, ultimate defense formation, card game illustration, 200x140` |
| 22 | `cards/skill/poison_cloud.png` | 毒雾弥漫 | `Toxic green cloud spreading across area, corrosive gas with skull particles, poison AOE effect, hazardous zone, card game illustration, 200x140` |
| 23 | `cards/skill/phase_shift.png` | 相位转移 | `Phasing through dimensions, body splitting into dimensional layers, blue-purple phase shift effect, defensive teleportation, card game illustration, 200x140` |

#### 能力牌（紫色/金色调边框区域）

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `cards/power/overclock.png` | 超频模式 | `System overclocking visual, CPU running at maximum with heat waves, performance boost indicator, red-orange overclock glow, card game illustration, 200x140` |
| 2 | `cards/power/ion_shield.png` | 离子护盾 | `Permanent ion shield generator active, continuous blue energy barrier orbiting body, passive defense system, card game illustration, 200x140` |
| 3 | `cards/power/nano_swarm.png` | 纳米蜂群 | `Autonomous nano drone swarm orbiting and attacking, cloud of tiny aggressive nanobots, persistent attack system, card game illustration, 200x140` |
| 4 | `cards/power/overload_protocol.png` | 过载协议 | `Dangerous overload protocol activated, energy output increased but system taking damage, risky power-up visual, card game illustration, 200x140` |
| 5 | `cards/power/auto_aim.png` | 自动瞄准 | `Advanced targeting system with auto-lock, crosshairs tracking multiple targets, AI-assisted aiming, enhanced accuracy visual, card game illustration, 200x140` |
| 6 | `cards/power/mech_enhance.png` | 机械强化 | `Mechanical body enhancements activating, armor plates shifting and reinforcing, cybernetic upgrade visual, card game illustration, 200x140` |
| 7 | `cards/power/defense_matrix.png` | 防御矩阵 | `Multi-layered defense matrix grid surrounding body, geometric shield patterns, comprehensive protection system, card game illustration, 200x140` |
| 8 | `cards/power/system_upgrade.png` | 系统升级 | `System-wide upgrade in progress, all components glowing with enhancement, level-up visual, comprehensive improvement, card game illustration, 200x140` |
| 9 | `cards/power/adaptive_armor.png` | 自适应装甲 | `Armor that adapts and strengthens when hit, reactive plating hardening on impact, self-improving defense, card game illustration, 200x140` |
| 10 | `cards/power/berserker.png` | 狂战士之怒 | `Berserker rage mode, red aura intensifying as health drops, desperate power surge, low HP damage boost visual, card game illustration, 200x140` |
| 11 | `cards/power/repair_drone.png` | 修复无人机 | `Small repair drone continuously healing, medical drone with green healing beam, passive regeneration, card game illustration, 200x140` |

---

### 🔵 第五批（中优先级）- 遗物/模块图标

每个64×64，PNG透明背景。

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `relics/nano_repairer.png` | 纳米修复器 | `Small medical nanobot device, cylindrical container with green glowing nanobots inside, sci-fi healing item icon, 64x64, transparent background` |
| 2 | `relics/quantum_chip.png` | 量子芯片 | `Glowing quantum processor chip, blue-purple circuitry visible, advanced computing component, sci-fi tech icon, 64x64, transparent background` |
| 3 | `relics/auto_turret.png` | 自动炮台 | `Miniature automated turret, small gun on a mechanical base, red targeting laser, compact weapon icon, 64x64, transparent background` |
| 4 | `relics/titanium_skeleton.png` | 钛合金骨架 | `Reinforced titanium skeleton frame, metallic bone structure, enhanced durability icon, silver-blue metal, 64x64, transparent background` |
| 5 | `relics/data_crystal.png` | 数据水晶 | `Glowing data storage crystal, faceted gem with digital information flowing inside, cyan-blue crystal icon, 64x64, transparent background` |
| 6 | `relics/nano_shield.png` | 纳米护盾 | `Compact nano shield generator, small device projecting hexagonal barrier pattern, blue defensive icon, 64x64, transparent background` |
| 7 | `relics/virus_program.png` | 病毒程序 | `Malicious virus program icon, skull made of green corrupted code, biohazard symbol, digital plague, 64x64, transparent background` |
| 8 | `relics/tactical_visor.png` | 战术目镜 | `Advanced tactical visor/eyepiece, HUD display with targeting reticle, military tech accessory, 64x64, transparent background` |
| 9 | `relics/cooling_system.png` | 冷却系统 | `Cryogenic cooling system component, frost-covered pipes and vents, blue ice crystals, temperature control device, 64x64, transparent background` |
| 10 | `relics/energy_recycler.png` | 能量回收器 | `Energy recycling device, circular mechanism converting waste to power, green recycling arrows with energy symbol, 64x64, transparent background` |
| 11 | `relics/magnetic_glove.png` | 磁力手套 | `Magnetic containment glove, gauntlet with purple magnetic field effect, attracting metal objects, 64x64, transparent background` |
| 12 | `relics/plasma_reactor.png` | 等离子反应堆 | `Miniature plasma reactor core, contained swirling orange plasma energy sphere, dangerous power source, 64x64, transparent background` |
| 13 | `relics/shield_generator.png` | 护盾发生器 | `Portable shield generator device, projecting blue energy barrier, defensive tech item, 64x64, transparent background` |
| 14 | `relics/energy_core.png` | 能量核心 | `Powerful energy core artifact, brilliant yellow-white energy sphere in containment, ultimate power source, 64x64, transparent background` |
| 15 | `relics/overclock_engine.png` | 超频引擎 | `Overclocked engine component, glowing red-hot with excess energy, performance enhancement device, 64x64, transparent background` |
| 16 | `relics/stealth_module.png` | 隐身模块 | `Cloaking/stealth module, semi-transparent device with light-bending effect, invisibility technology, 64x64, transparent background` |
| 17 | `relics/ultimate_core.png` | 终极核心 | `Ultimate power core artifact, rainbow energy contained in crystalline structure, legendary item glow, 64x64, transparent background` |
| 18 | `relics/time_dilator.png` | 时间膨胀器 | `Time dilation device, clock mechanism with warped spacetime around it, temporal technology, 64x64, transparent background` |
| 19 | `relics/vampire_module.png` | 吸血模块 | `Energy vampirism module, dark red device draining life force, parasitic attachment, gothic tech, 64x64, transparent background` |
| 20 | `relics/card_compressor.png` | 卡牌压缩器 | `Data compression device, shrinking holographic cards into smaller size, optimization technology, 64x64, transparent background` |
| 21 | `relics/phoenix_core.png` | 凤凰核心 | `Phoenix rebirth core, golden-red firebird energy contained in orb, resurrection artifact, legendary glow, 64x64, transparent background` |

---

### 🟣 第六批（中优先级）- 地图节点图标

每个48×48，PNG透明背景。

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `ui/node-combat.png` | 战斗节点 | `Sword icon for combat, crossed energy blades, red-orange glow, circular badge, game map icon, 48x48, transparent background` |
| 2 | `ui/node-elite.png` | 精英节点 | `Skull icon for elite battle, glowing purple skull with crown, dangerous encounter marker, circular badge, 48x48, transparent background` |
| 3 | `ui/node-boss.png` | Boss节点 | `Crown icon for boss battle, golden crown with red gems, final challenge marker, circular badge, 48x48, transparent background` |
| 4 | `ui/node-event.png` | 事件节点 | `Question mark icon for random event, glowing blue-purple mystery symbol, circular badge, 48x48, transparent background` |
| 5 | `ui/node-shop.png` | 商店节点 | `Shopping bag or merchant icon for shop, gold coin symbol, trading post marker, circular badge, 48x48, transparent background` |
| 6 | `ui/node-rest.png` | 休息节点 | `Campfire or rest icon, healing green cross with tent, recovery point marker, circular badge, 48x48, transparent background` |
| 7 | `ui/node-treasure.png` | 宝箱节点 | `Treasure chest icon, glowing golden chest with sparkles, reward marker, circular badge, 48x48, transparent background` |

---

### ⚪ 第七批（低优先级）- 事件插画 & 其他

#### 事件插画（400×300）

| # | 文件名 | 名称 | 提示词 |
|---|--------|------|--------|
| 1 | `events/abandoned_lab.png` | 废弃实验室 | `Abandoned sci-fi laboratory, broken test tubes with glowing liquids, flickering monitors, dusty equipment, mysterious and slightly dangerous, cyberpunk lab interior, 400x300` |
| 2 | `events/survivor_signal.png` | 幸存者信号 | `Distress signal beacon blinking in dark corridor, radio waves visual, hope in darkness, sci-fi rescue scenario, 400x300` |
| 3 | `events/system_failure.png` | 系统故障 | `Malfunctioning system with electrical arcs and sparks, warning alerts on screens, dangerous corridor with exposed wiring, cyberpunk disaster, 400x300` |
| 4 | `events/energy_node.png` | 能量节点 | `Glowing blue energy node pulsating with power, crystalline power source in alcove, restorable energy point, sci-fi power station, 400x300` |
| 5 | `events/mysterious_merchant.png` | 神秘商人 | `Hooded mysterious figure holding a glowing card in dark alley, masked face barely visible, shady dealer, cyberpunk black market, 400x300` |

---

## 五、生成注意事项

### 通用规则
1. **背景透明**: 所有精灵/图标必须PNG透明背景
2. **色彩一致**: 严格遵循主色调（青#00d4ff、紫#b44aff）
3. **风格统一**: 所有资源保持赛博朋克科幻风格
4. **尺寸精确**: 严格按照规定尺寸生成
5. **居中构图**: 主体内容居中，四周留适当边距

### 生成工具推荐
- **Midjourney**: 适合生成高质量概念图和背景
- **DALL-E 3**: 适合生成有明确构图的插画
- **Stable Diffusion**: 适合批量生成并保持风格一致
- **Canva AI / 通义万相**: 中文提示词友好

### 后处理
- 生成后可能需要用 Photoshop/GIMP 去除背景
- 调整尺寸到精确像素
- 确保颜色与游戏UI协调

---

## 六、代码集成指南

### 背景图集成
```css
/* CSS中替换现有背景 */
#screen-title {
    background: url('../assets/backgrounds/title-bg.png') center/cover no-repeat,
                radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a1a 70%);
}
```

### 敌人精灵集成
```javascript
// enemies.js 中，将 icon 字段改为图片路径
// 原: icon: '🤖'
// 新: icon: '🤖', sprite: 'assets/enemies/normal/patrol_drone.png'
```

### 卡牌插画集成
```javascript
// cards.js 中，新增 art 字段
// art: 'assets/cards/attack/laser_shot.png'
```

### CSS渲染精灵
```css
.enemy-sprite img {
    width: 128px;
    height: 128px;
    object-fit: contain;
}
.card-art {
    width: 200px;
    height: 140px;
    object-fit: cover;
    border-radius: 4px;
}
```

---

## 七、优先级总览

| 优先级 | 批次 | 内容 | 数量 | 预计时间 |
|--------|------|------|------|---------|
| 🔴 P0 | 第一批 | 标题背景+战斗背景+玩家 | 5张 | 30分钟 |
| 🟡 P1 | 第二批 | 普通+精英敌人 | 26张 | 2小时 |
| 🟠 P2 | 第三批 | Boss精灵 | 5张 | 30分钟 |
| 🟢 P3 | 第四批 | 卡牌插画 | ~45张 | 3小时 |
| 🔵 P4 | 第五批 | 遗物图标 | 21张 | 1小时 |
| 🟣 P5 | 第六批 | 地图节点 | 7张 | 20分钟 |
| ⚪ P6 | 第七批 | 事件插画 | 5+张 | 30分钟 |

**建议**: 按批次顺序生成，每批完成后立即集成到代码中测试效果。
