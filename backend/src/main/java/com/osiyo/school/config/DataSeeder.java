package com.osiyo.school.config;

import com.osiyo.school.entity.Event;
import com.osiyo.school.entity.Faq;
import com.osiyo.school.entity.GalleryImage;
import com.osiyo.school.entity.HomepageSection;
import com.osiyo.school.entity.News;
import com.osiyo.school.entity.Role;
import com.osiyo.school.entity.Setting;
import com.osiyo.school.entity.Teacher;
import com.osiyo.school.entity.User;
import com.osiyo.school.repository.EventRepository;
import com.osiyo.school.repository.FaqRepository;
import com.osiyo.school.repository.GalleryImageRepository;
import com.osiyo.school.repository.HomepageSectionRepository;
import com.osiyo.school.repository.NewsRepository;
import com.osiyo.school.repository.RoleRepository;
import com.osiyo.school.repository.SettingRepository;
import com.osiyo.school.repository.TeacherRepository;
import com.osiyo.school.repository.UserRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final NewsRepository newsRepository;
    private final EventRepository eventRepository;
    private final FaqRepository faqRepository;
    private final TeacherRepository teacherRepository;
    private final GalleryImageRepository galleryImageRepository;
    private final HomepageSectionRepository homepageSectionRepository;
    private final SettingRepository settingRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Role superAdminRole = roleRepository.findByName("ROLE_SUPER_ADMIN")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_SUPER_ADMIN").build()));
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_ADMIN").build()));
        Role editorRole = roleRepository.findByName("ROLE_EDITOR")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ROLE_EDITOR").build()));

        User adminUser = userRepository.findByUsername("admin").orElse(null);
        if (adminUser == null) {
            userRepository.save(User.builder()
                    .fullName("Superadmin")
                    .username("admin")
                    .email("admin@osiyo-school.uz")
                    .passwordHash(passwordEncoder.encode("Admin123!"))
                    .enabled(true)
                    .roles(Set.of(superAdminRole))
                    .build());
        } else {
            adminUser.setFullName("Superadmin");
            adminUser.getRoles().add(superAdminRole);
            userRepository.save(adminUser);
        }

        seedHomepageSections();
        seedSettings();
        seedTeachers();
        seedNews();
        seedEvents();
        seedFaqs();
        seedGallery();
    }

    private void seedHomepageSections() {
        List<HomepageSection> sections = List.of(
                HomepageSection.builder()
                        .sectionKey("mission")
                        .titleUz("Bizning missiyamiz")
                        .titleEn("Our Mission")
                        .titleRu("Наша миссия")
                        .contentUz("OSIYO XALQARO MAKTABI har bir o‘quvchining intellektual, ijtimoiy va ma’naviy salohiyatini ochishga xizmat qiladigan xavfsiz va zamonaviy ta’lim muhitini yaratadi.")
                        .contentEn("OSIYO International School nurtures each learner in a safe, modern, and globally minded environment.")
                        .contentRu("OSIYO International School раскрывает потенциал каждого ученика в безопасной и современной среде.")
                        .imageUrl("/placeholders/mission.svg")
                        .active(true)
                        .build(),
                HomepageSection.builder()
                        .sectionKey("principal-message")
                        .titleUz("Direktor murojaati")
                        .titleEn("Principal Message")
                        .titleRu("Обращение директора")
                        .contentUz("Biz ilm, tarbiya va global qarashni uyg‘unlashtirgan maktab muhitini barpo etdik. Har bir farzandning yo‘li hurmat, tartib va ishonch bilan boshlanadi.")
                        .contentEn("We combine academic strength, character building, and global perspective in every student journey.")
                        .contentRu("Мы объединяем академическую силу, воспитание и глобальный взгляд в каждом образовательном пути.")
                        .imageUrl("/placeholders/principal.svg")
                        .active(true)
                        .build(),
                HomepageSection.builder()
                        .sectionKey("admissions-banner")
                        .titleUz("2026-2027 qabuli ochiq")
                        .titleEn("Admissions Open for 2026-2027")
                        .titleRu("Открыт прием на 2026-2027")
                        .contentUz("Maktabimizga ariza topshirish jarayonini bugunoq boshlang va farzandingiz uchun xalqaro darajadagi imkoniyatlarni kashf eting.")
                        .contentEn("Start your child’s journey with an international-standard education today.")
                        .contentRu("Начните путь вашего ребенка к образованию международного уровня уже сегодня.")
                        .imageUrl("/placeholders/admissions.svg")
                        .active(true)
                        .build(),
                HomepageSection.builder()
                        .sectionKey("partners")
                        .titleUz("Hamkorlar va yo‘nalishlar")
                        .titleEn("Partners & Affiliations")
                        .titleRu("Партнеры и направления")
                        .contentUz("Cambridge, STEAM, til ta’limi va xalqaro olimpiada tayyorgarligi yo‘nalishlari uchun hamkorlik dasturlari ishlab chiqilgan.")
                        .contentEn("Partnerships support Cambridge, STEAM, language development, and olympiad pathways.")
                        .contentRu("Партнерские программы поддерживают Cambridge, STEAM, языковое развитие и олимпиадное направление.")
                        .imageUrl("/placeholders/partners.svg")
                        .active(true)
                        .build()
        );
        sections.forEach(this::upsertHomepageSection);
    }

    private void seedSettings() {
        List<Setting> settings = List.of(
                Setting.builder().settingKey("school_name").settingValue("OSIYO XALQARO MAKTABI").build(),
                Setting.builder().settingKey("contact_phone").settingValue("+998 90 123 45 67").build(),
                Setting.builder().settingKey("contact_email").settingValue("info@osiyo-school.uz").build(),
                Setting.builder().settingKey("contact_address").settingValue("Toshkent shahri, Yunusobod tumani, Ma’rifat ko‘chasi 12").build(),
                Setting.builder().settingKey("announcement_text").settingValue("2026-2027 o‘quv yili uchun qabul davom etmoqda. Erta ro‘yxatdan o‘tganlar uchun konsultatsiya bepul.").build(),
                Setting.builder().settingKey("working_hours").settingValue("Dushanba - Juma, 08:30 - 17:30").build(),
                Setting.builder().settingKey("instagram_url").settingValue("https://instagram.com/osiyo.school").build(),
                Setting.builder().settingKey("telegram_url").settingValue("https://t.me/osiyo_school").build()
        );

        settings.forEach(this::upsertSetting);
    }

    private void seedTeachers() {
        if (teacherRepository.count() > 0) {
            return;
        }

        teacherRepository.saveAll(List.of(
                Teacher.builder().fullName("Dilafruz Qodirova").role("Direktor").bio("20 yildan ortiq ta’lim boshqaruvi tajribasiga ega, xalqaro maktablar rivoji bo‘yicha ekspert.").photoUrl("/placeholders/teacher.svg").email("d.qodirova@osiyo-school.uz").phone("+998 90 100 11 11").build(),
                Teacher.builder().fullName("James Walker").role("Academic Director").bio("STEM va inquiry-based learning yondashuvlari bo‘yicha xalqaro dasturlarni boshqaradi.").photoUrl("/placeholders/teacher.svg").email("j.walker@osiyo-school.uz").phone("+998 90 100 11 12").build(),
                Teacher.builder().fullName("Saida Ergasheva").role("Boshlang‘ich ta’lim rahbari").bio("Boshlang‘ich bosqichda differensial ta’lim va ijtimoiy-emotsional yondashuvlarni olib boradi.").photoUrl("/placeholders/teacher.svg").email("s.ergasheva@osiyo-school.uz").phone("+998 90 100 11 13").build(),
                Teacher.builder().fullName("Anton Petrovskiy").role("Matematika o‘qituvchisi").bio("Olimpiada tayyorgarligi va analitik tafakkur ko‘nikmalarini rivojlantirishga ixtisoslashgan.").photoUrl("/placeholders/teacher.svg").email("a.petrovskiy@osiyo-school.uz").phone("+998 90 100 11 14").build(),
                Teacher.builder().fullName("Malika Tursunova").role("Ingliz tili bo‘limi yetakchisi").bio("IELTS, academic writing va global communication dasturlarini yuritadi.").photoUrl("/placeholders/teacher.svg").email("m.tursunova@osiyo-school.uz").phone("+998 90 100 11 15").build(),
                Teacher.builder().fullName("Otabek Rasulov").role("Psixolog va student support coordinator").bio("O‘quvchilar farovonligi, moslashuvi va motivatsiyasi bo‘yicha individual dasturlar olib boradi.").photoUrl("/placeholders/teacher.svg").email("o.rasulov@osiyo-school.uz").phone("+998 90 100 11 16").build()
        ));
    }

    private void seedNews() {
        if (newsRepository.count() > 0) {
            return;
        }

        newsRepository.saveAll(List.of(
                News.builder().title("OSIYO maktabida yangi STEAM laboratoriyasi ishga tushdi").slug("steam-laboratoriya-ishga-tushdi").summary("Yangi laboratoriya robototexnika, dizayn fikrlash va tajriba asosidagi darslar uchun mo‘ljallangan.").content("Yangi STEAM laboratoriyasi o‘quvchilarga fizika, texnologiya, muhandislik va san’atni uyg‘unlashtirgan amaliy tajribalarni taqdim etadi. Laboratoriya zamonaviy qurilmalar, mini-fabrikatsiya zonasi va jamoaviy loyiha maydoniga ega.").featuredImage("/placeholders/news.svg").category("Campus").published(true).publishedAt(LocalDateTime.now().minusDays(10)).build(),
                News.builder().title("Ingliz tili haftaligi doirasida xalqaro debat turniri bo‘lib o‘tdi").slug("xalqaro-debat-turniri").summary("Upper school o‘quvchilari muloqot, argumentatsiya va liderlik ko‘nikmalarini namoyish etdi.").content("Debat haftaligi davomida o‘quvchilar global mavzular yuzasidan jamoalar tarkibida chiqish qildi, xalqaro hakamlar bilan fikr almashdi va akademik nutq ko‘nikmalarini mustahkamladi.").featuredImage("/placeholders/news.svg").category("Academics").published(true).publishedAt(LocalDateTime.now().minusDays(6)).build(),
                News.builder().title("Boshlang‘ich sinflarda kitobxonlik marafoni boshlandi").slug("kitobxonlik-marafoni").summary("Ota-onalar va ustozlar ishtirokida bolalarda mutolaa madaniyatini rivojlantirishga qaratilgan loyiha yo‘lga qo‘yildi.").content("Marafon davomida har hafta tavsiya etilgan kitoblar bo‘yicha uchrashuvlar, sahna ko‘rinishlari va oilaviy kitob tanlovi o‘tkaziladi.").featuredImage("/placeholders/news.svg").category("Student Life").published(true).publishedAt(LocalDateTime.now().minusDays(4)).build(),
                News.builder().title("OSIYO jamoasi matematika olimpiadasida viloyat bosqichida g‘olib bo‘ldi").slug("matematika-olimpiadasi-golib").summary("Maktab o‘quvchilari kuchli natija qayd etib, respublika bosqichiga yo‘llanma oldi.").content("Olimpiadada qatnashgan o‘quvchilar mantiqiy masalalar, algebra va geometriya bo‘limlarida yuqori natijalarni qo‘lga kiritdi. Ustozlar jamoasi bu natijani tizimli akademik tayyorgarlik samarasiga bog‘lamoqda.").featuredImage("/placeholders/news.svg").category("Achievements").published(true).publishedAt(LocalDateTime.now().minusDays(2)).build()
        ));
    }

    private void seedEvents() {
        if (eventRepository.count() > 0) {
            return;
        }

        eventRepository.saveAll(List.of(
                Event.builder().title("Open House Day").slug("open-house-day").summary("Ota-onalar va mehmonlar uchun maktab bo‘ylab tanishtiruv kuni.").description("Open House doirasida campus tour, demo lessons, leadership meet va qabul bo‘yicha konsultatsiyalar tashkil etiladi.").featuredImage("/placeholders/event.svg").category("Admissions").eventDate(LocalDate.now().plusDays(7)).startTime(LocalTime.of(10, 0)).endTime(LocalTime.of(13, 0)).location("OSIYO Main Campus").published(true).build(),
                Event.builder().title("Spring Arts Festival").slug("spring-arts-festival").summary("Musiqa, teatr va tasviriy san’at bo‘yicha o‘quvchilar ijodiy chiqishlari.").description("Festival sahna ko‘rinishlari, orkestr chiqishi, galereya ko‘rgazmasi va parent lounge bilan boyitiladi.").featuredImage("/placeholders/event.svg").category("Arts").eventDate(LocalDate.now().plusDays(14)).startTime(LocalTime.of(15, 0)).endTime(LocalTime.of(18, 30)).location("Grand Hall").published(true).build(),
                Event.builder().title("STEM Innovation Challenge").slug("stem-innovation-challenge").summary("Middle va High school o‘quvchilari jamoaviy loyiha himoyasi bilan qatnashadi.").description("O‘quvchilar real hayot muammolariga texnologik va ijtimoiy yechimlar taklif qilib, ekspertlar oldida taqdimot qiladi.").featuredImage("/placeholders/event.svg").category("Academics").eventDate(LocalDate.now().plusDays(21)).startTime(LocalTime.of(9, 30)).endTime(LocalTime.of(14, 0)).location("STEAM Lab").published(true).build(),
                Event.builder().title("Parent Partnership Forum").slug("parent-partnership-forum").summary("Ota-onalar bilan ta’lim sifati, farzand rivoji va muloqot bo‘yicha uchrashuv.").description("Forum maktab va oila hamkorligini kuchaytirish, baholash tizimi va student wellbeing bo‘yicha ochiq muloqot maydonidir.").featuredImage("/placeholders/event.svg").category("Community").eventDate(LocalDate.now().plusDays(30)).startTime(LocalTime.of(11, 0)).endTime(LocalTime.of(12, 30)).location("Conference Room").published(true).build()
        ));
    }

    private void seedFaqs() {
        if (faqRepository.count() > 0) {
            return;
        }

        faqRepository.saveAll(List.of(
                Faq.builder().question("Maktabda ta’lim qaysi tillarda olib boriladi?").answer("Ta’lim dasturi o‘zbek, ingliz va rus tillarini qo‘llab-quvvatlaydi. Asosiy akademik yo‘nalishlarda ingliz tili integratsiyasi kuchli olib boriladi.").category("Academics").sortOrder(1).active(true).build(),
                Faq.builder().question("Qabul jarayoni necha bosqichdan iborat?").answer("Ariza topshirish, dastlabki suhbat, diagnostik baholash va yakuniy qaror bosqichlari mavjud.").category("Admissions").sortOrder(2).active(true).build(),
                Faq.builder().question("Transport xizmati mavjudmi?").answer("Ha, ayrim hududlar bo‘yicha xavfsiz va kuzatuvli transport xizmati yo‘lga qo‘yilgan.").category("Campus").sortOrder(3).active(true).build(),
                Faq.builder().question("To‘garaklar va sport mashg‘ulotlari qaysi kunlari bo‘ladi?").answer("Darsdan keyingi klublar va sport mashg‘ulotlari haftalik jadval asosida o‘tkaziladi.").category("Student Life").sortOrder(4).active(true).build(),
                Faq.builder().question("Ota-onalar bilan aloqa qanday yo‘lga qo‘yiladi?").answer("Parent portal, haftalik hisobotlar, individual uchrashuvlar va tematik forumlar orqali muntazam aloqa qilinadi.").category("Communication").sortOrder(5).active(true).build(),
                Faq.builder().question("Maktabda psixologik yordam xizmati bormi?").answer("Ha, student support markazi orqali psixolog, counselor va wellbeing coordinator faoliyat yuritadi.").category("Support").sortOrder(6).active(true).build()
        ));
    }

    private void seedGallery() {
        if (galleryImageRepository.count() > 0) {
            return;
        }

        galleryImageRepository.saveAll(List.of(
                GalleryImage.builder().title("STEM laboratoriya mashg‘uloti").imageUrl("/placeholders/gallery.svg").category("Academics").uploadedAt(LocalDateTime.now().minusDays(12)).build(),
                GalleryImage.builder().title("Kutubxona va reading corner").imageUrl("/placeholders/gallery.svg").category("Campus").uploadedAt(LocalDateTime.now().minusDays(11)).build(),
                GalleryImage.builder().title("San’at festivali sahnasi").imageUrl("/placeholders/gallery.svg").category("Arts").uploadedAt(LocalDateTime.now().minusDays(9)).build(),
                GalleryImage.builder().title("Football training session").imageUrl("/placeholders/gallery.svg").category("Sports").uploadedAt(LocalDateTime.now().minusDays(8)).build(),
                GalleryImage.builder().title("Primary classroom activity").imageUrl("/placeholders/gallery.svg").category("Classroom").uploadedAt(LocalDateTime.now().minusDays(7)).build(),
                GalleryImage.builder().title("Leadership camp trip").imageUrl("/placeholders/gallery.svg").category("Trips").uploadedAt(LocalDateTime.now().minusDays(6)).build()
        ));
    }

    private void upsertHomepageSection(HomepageSection seeded) {
        HomepageSection section = homepageSectionRepository.findBySectionKey(seeded.getSectionKey()).orElse(seeded);

        section.setTitleUz(repairIfNeeded(section.getTitleUz(), seeded.getTitleUz()));
        section.setTitleEn(repairIfNeeded(section.getTitleEn(), seeded.getTitleEn()));
        section.setTitleRu(repairIfNeeded(section.getTitleRu(), seeded.getTitleRu()));
        section.setContentUz(repairIfNeeded(section.getContentUz(), seeded.getContentUz()));
        section.setContentEn(repairIfNeeded(section.getContentEn(), seeded.getContentEn()));
        section.setContentRu(repairIfNeeded(section.getContentRu(), seeded.getContentRu()));
        section.setImageUrl(repairIfNeeded(section.getImageUrl(), seeded.getImageUrl()));
        section.setActive(seeded.isActive());

        homepageSectionRepository.save(section);
    }

    private void upsertSetting(Setting seeded) {
        Setting setting = settingRepository.findBySettingKey(seeded.getSettingKey()).orElse(seeded);
        setting.setSettingValue(repairIfNeeded(setting.getSettingValue(), seeded.getSettingValue()));
        settingRepository.save(setting);
    }

    private String repairIfNeeded(String currentValue, String seededValue) {
        if (currentValue == null || currentValue.isBlank() || looksCorrupted(currentValue)) {
            return seededValue;
        }
        return currentValue;
    }

    private boolean looksCorrupted(String value) {
        return value.contains("вЂ")
                || value.matches(".*[ЂЃЌЎќўџ€™‹›].*");
    }
}
