-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb
-- Généré le : jeu. 26 oct. 2023 à 14:00
-- Version du serveur : 11.0.3-MariaDB-1:11.0.3+maria~ubu2204
-- Version de PHP : 8.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `devcom`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_category`, `title`) VALUES
(1, 'CSS'),
(2, 'HTML'),
(3, 'PHP'),
(4, 'JavaScript'),
(5, 'SQL'),
(6, 'React'),
(7, 'Node.js'),
(8, 'Autre');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_publication` int(11) NOT NULL,
  `content` text NOT NULL,
  `parent_comment` int(11) DEFAULT NULL,
  `date_creation` datetime NOT NULL,
  `date_update` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id_comment`, `id_user`, `id_publication`, `content`, `parent_comment`, `date_creation`, `date_update`) VALUES
(1, 1, 12, 'Cumque possimus assumenda odio beatae animi animi voluptas culpa voluptas.', NULL, '2023-01-18 18:06:05', '2023-10-26 08:00:46'),
(2, 19, 36, 'Consectetur numquam facilis.', NULL, '2022-12-26 18:46:24', '2023-10-25 19:45:13'),
(3, 11, 16, 'Ipsum quo necessitatibus dolorem nam.', NULL, '2023-09-07 14:46:49', '2023-10-26 10:26:18'),
(4, 10, 6, 'Quas itaque ducimus nostrum debitis placeat magnam iste.', NULL, '2023-01-17 21:22:38', '2023-10-26 14:34:13'),
(5, 4, 16, 'Aliquid optio eos.', NULL, '2023-02-19 02:46:58', '2023-10-26 02:00:16'),
(6, 3, 47, 'Fuga expedita laudantium est impedit.', NULL, '2022-10-27 20:59:49', '2023-10-25 22:38:00'),
(7, 1, 15, 'Eos modi consequuntur.', NULL, '2023-05-21 17:57:24', '2023-10-25 19:35:25'),
(8, 21, 11, 'Rerum possimus accusantium impedit molestiae tempora dicta.', NULL, '2023-01-24 01:47:37', '2023-10-25 19:32:09'),
(9, 1, 23, 'Ex deleniti eius animi explicabo quibusdam magnam veniam voluptatibus iste.', NULL, '2023-06-17 21:13:36', '2023-10-26 12:40:44'),
(10, 15, 5, 'Quam possimus reiciendis atque quisquam dolorem.', NULL, '2023-03-03 02:26:57', '2023-10-26 12:52:44'),
(11, 6, 16, 'Quasi totam saepe assumenda veniam.', NULL, '2023-07-17 06:55:59', '2023-10-25 18:33:16'),
(12, 3, 17, 'Maiores distinctio dolor voluptate vel.', NULL, '2023-06-08 06:23:38', '2023-10-25 22:35:49'),
(13, 14, 21, 'Dolorum sed earum necessitatibus doloribus non.', NULL, '2023-01-29 22:20:18', '2023-10-25 16:53:47'),
(14, 32, 7, 'Mollitia hic explicabo aut similique similique aliquid.', NULL, '2023-10-03 11:56:41', '2023-10-26 01:17:51'),
(15, 41, 23, 'Ratione tenetur sit dolorum sed.', NULL, '2022-12-25 18:49:49', '2023-10-26 02:08:29'),
(16, 46, 3, 'Aut aliquam maiores nihil quasi animi perspiciatis numquam numquam eius.', NULL, '2023-04-17 19:40:54', '2023-10-25 22:02:42'),
(17, 15, 2, 'Error aut eligendi minus velit labore a reprehenderit deserunt.', NULL, '2023-08-04 05:35:41', '2023-10-25 23:28:28'),
(18, 43, 12, 'Voluptatem sint voluptate quidem soluta error impedit consequuntur voluptatum dolorem.', NULL, '2023-02-16 14:31:06', '2023-10-26 07:12:01'),
(19, 24, 25, 'Quasi fugit unde quod.', NULL, '2023-06-16 00:03:23', '2023-10-26 14:01:59'),
(20, 4, 43, 'Vel labore cupiditate sunt.', NULL, '2023-07-28 03:52:06', '2023-10-25 20:34:51'),
(21, 43, 4, 'Assumenda temporibus unde magnam.', NULL, '2023-02-05 06:53:24', '2023-10-26 02:36:11'),
(22, 22, 30, 'Nisi architecto nesciunt reprehenderit sunt dolore facilis dolor animi accusamus.', NULL, '2023-05-25 07:38:07', '2023-10-26 08:14:30'),
(23, 46, 20, 'Fugit blanditiis ut explicabo laboriosam alias.', NULL, '2023-09-15 21:58:46', '2023-10-26 13:55:10'),
(24, 2, 36, 'Sapiente minima eligendi magnam exercitationem a molestias quis rem odio.', NULL, '2023-09-20 15:33:04', '2023-10-26 08:24:21'),
(25, 36, 7, 'Nobis ab similique distinctio vitae laborum sit quae debitis.', NULL, '2023-04-30 12:11:19', '2023-10-26 00:18:05'),
(26, 2, 49, 'Sint sapiente perspiciatis tenetur soluta.', NULL, '2023-09-18 17:23:12', '2023-10-26 03:51:48'),
(27, 33, 23, 'Ullam enim hic odit.', NULL, '2023-09-19 11:56:39', '2023-10-25 20:44:22'),
(28, 11, 23, 'Similique occaecati cupiditate nostrum accusantium corporis quidem dolorem.', NULL, '2023-06-26 08:28:53', '2023-10-26 06:19:13'),
(29, 5, 44, 'Iste possimus explicabo delectus saepe.', NULL, '2023-02-07 11:21:51', '2023-10-26 03:23:01'),
(30, 5, 3, 'Similique natus id ad consectetur esse numquam praesentium vel ipsum.', NULL, '2022-11-20 15:15:14', '2023-10-26 09:36:39'),
(31, 10, 24, 'Sit veniam reiciendis.', NULL, '2023-05-20 00:27:22', '2023-10-26 02:06:59'),
(32, 27, 27, 'Dicta dolores delectus enim excepturi dolorem beatae incidunt.', NULL, '2023-08-04 09:01:39', '2023-10-26 04:58:04'),
(33, 16, 26, 'Vel culpa magni quas ducimus incidunt.', NULL, '2023-03-15 21:11:46', '2023-10-26 05:36:47'),
(34, 33, 50, 'Dicta assumenda harum maiores occaecati fugit qui adipisci explicabo omnis.', NULL, '2023-02-26 17:36:33', '2023-10-26 12:26:57'),
(35, 48, 28, 'Sed quas tempore saepe quidem tenetur.', NULL, '2023-01-02 10:22:09', '2023-10-26 15:06:28'),
(36, 43, 4, 'Excepturi modi placeat dolor neque deleniti qui.', NULL, '2023-03-07 10:56:28', '2023-10-25 23:22:04'),
(37, 45, 49, 'Non quaerat fuga reprehenderit illo qui voluptates facilis quidem corrupti.', NULL, '2023-09-22 09:34:07', '2023-10-26 05:57:49'),
(38, 35, 21, 'Sint nam quo possimus ducimus repudiandae ex praesentium.', NULL, '2023-10-23 18:12:45', '2023-10-25 22:39:56'),
(39, 15, 14, 'Aut rem accusantium saepe cupiditate id atque ducimus.', NULL, '2023-07-06 10:12:04', '2023-10-26 10:57:41'),
(40, 30, 8, 'Dignissimos numquam velit molestiae aspernatur.', NULL, '2023-05-06 15:30:24', '2023-10-25 16:55:15'),
(41, 25, 46, 'Adipisci officia cumque neque dignissimos accusamus asperiores facere quia magni.', NULL, '2023-04-27 14:22:38', '2023-10-25 18:40:09'),
(42, 32, 8, 'Reiciendis cum molestiae veniam vero fugiat nemo non explicabo voluptate.', NULL, '2023-01-13 22:14:44', '2023-10-25 23:11:04'),
(43, 14, 12, 'Delectus provident eum quo laboriosam recusandae fuga.', NULL, '2023-08-30 02:00:13', '2023-10-26 09:38:42'),
(44, 33, 2, 'Sit amet numquam nam culpa vero in minus omnis.', NULL, '2023-10-04 11:03:44', '2023-10-26 13:11:44'),
(45, 8, 46, 'Eius nihil aliquam voluptatibus atque suscipit.', NULL, '2023-04-16 09:04:16', '2023-10-25 19:12:33'),
(46, 19, 46, 'Eligendi iste iste ipsum voluptatem.', NULL, '2023-07-08 13:51:50', '2023-10-26 03:24:52'),
(47, 47, 24, 'Ut quam eaque.', NULL, '2022-11-26 00:15:13', '2023-10-26 02:43:50'),
(48, 9, 36, 'Aut voluptatibus debitis quae repellat hic laborum.', NULL, '2023-09-19 16:44:19', '2023-10-26 07:56:36'),
(49, 37, 43, 'Dolor voluptatem distinctio.', NULL, '2023-02-01 07:47:37', '2023-10-25 21:17:18'),
(50, 45, 8, 'Dignissimos voluptas cupiditate veritatis error distinctio repudiandae voluptatibus.', NULL, '2022-12-27 05:51:30', '2023-10-25 22:55:21'),
(101, 1, 5, 'Je suis un commentaire enfant', 10, '2023-10-26 15:57:35', NULL),
(102, 1, 5, 'Et un autre', 10, '2023-10-26 15:57:42', NULL),
(103, 2, 30, 'Bonjour Savin_Marie', 22, '2023-10-26 15:58:07', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

CREATE TABLE `publications` (
  `id_publication` int(11) NOT NULL,
  `type` enum('article','discussion') NOT NULL DEFAULT 'article',
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `date_creation` datetime NOT NULL,
  `date_update` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`id_publication`, `type`, `title`, `description`, `content`, `image`, `id_user`, `date_creation`, `date_update`) VALUES
(1, 'article', 'aliquid ex sequi facilis nam', 'Expedita provident maiores quis magni ipsum.', 'Totam doloremque necessitatibus vitae sed deleniti esse aliquam esse adipisci. Natus culpa fugit laudantium aliquid iste perferendis consequatur sint. Dolorem rerum tempore iusto.\nQui ducimus aliquam nam voluptates ad suscipit quisquam ipsam. Voluptates qui expedita ratione architecto. Aut eius harum.\nAliquam repudiandae ad voluptas error eaque laboriosam aliquam eaque odit. Blanditiis rem modi aliquam unde quis quasi. Nisi quis doloremque nemo vitae quas inventore.', NULL, 39, '2023-03-14 19:49:10', '2023-10-26 13:43:28'),
(2, 'article', 'vitae facere dicta maiores quisquam', 'Vero blanditiis mollitia vero ipsa optio.', 'Officia nobis laboriosam quibusdam sequi corporis reprehenderit provident facere doloremque. Sed distinctio et rerum ratione ipsam. Ratione molestiae qui sed eveniet autem a magnam modi.\nSit vitae deleniti ut tenetur optio error atque natus. Quaerat nam illum facere ab laboriosam consectetur eaque. Eveniet repellendus reiciendis quas omnis debitis ut dolor.\nDolorum quaerat blanditiis vel veniam eaque corrupti numquam. Necessitatibus eos qui sit iusto aspernatur voluptate delectus. Voluptas odit iure consequatur aperiam laborum impedit.', NULL, 7, '2022-12-09 22:01:56', '2023-10-26 02:34:18'),
(3, 'discussion', 'ad doloremque placeat consequatur dolor', 'Nulla atque quaerat tenetur officia.', 'Quis ratione natus dignissimos praesentium. Modi molestias aliquam dignissimos hic odio. Explicabo rerum fugiat eaque.\nLaborum dolores sunt fugiat nobis id debitis est. Expedita nemo nulla. Esse necessitatibus in.\nIpsum laboriosam optio quis facilis. Odit consequuntur consequatur saepe odio possimus iure. Nobis amet labore odit occaecati.', NULL, 5, '2023-02-19 17:41:19', '2023-10-26 06:17:03'),
(4, 'article', 'inventore aperiam commodi rem ad', 'Libero perferendis voluptatem.', 'Consequuntur saepe minus laboriosam ducimus eum iste placeat sed quaerat. Tempora aliquid aperiam nesciunt omnis voluptate minima vitae tempore ab. Assumenda cupiditate sed nemo perferendis quidem tenetur officia autem.\nNatus voluptas totam exercitationem doloremque quaerat. Ab corrupti sunt tempore tenetur doloribus. Culpa eligendi nostrum ex quia nobis molestias architecto voluptas.\nFacilis rerum iure officia occaecati expedita reiciendis. Optio mollitia cumque magni enim blanditiis quos quidem. Rerum atque tempora eum exercitationem modi incidunt enim.', NULL, 24, '2023-05-21 04:08:51', '2023-10-26 14:48:06'),
(5, 'article', 'tempore mollitia corporis ut nihil', 'Quidem temporibus minima natus eligendi amet.', 'Nulla dolorem ea facere sequi consequuntur officia quibusdam at. Voluptates atque sit modi rem dolorem fugiat facilis adipisci. Commodi illum id quibusdam nam quaerat consequatur voluptates maxime non.\nImpedit dolores inventore. Error magnam incidunt quidem impedit inventore nihil. Inventore accusantium dolore.\nRepellat distinctio placeat praesentium labore ab non. Saepe cumque iure nihil quod nobis magni. Ipsa accusantium magnam totam.', NULL, 9, '2023-10-16 12:29:07', '2023-10-25 21:04:38'),
(6, 'discussion', 'saepe officia amet totam numquam', 'Quae assumenda fugit exercitationem sint dolore corrupti provident doloremque in.', 'Ducimus recusandae dolorem et quos pariatur nihil aut ad. Error minus enim est at blanditiis maiores. Exercitationem voluptate quam blanditiis delectus.\nOccaecati quibusdam deserunt. Sed harum veniam cumque tempora officiis hic placeat. Porro cumque rerum alias optio animi fugit voluptatem voluptatem vero.\nAb aliquid ipsum alias qui placeat itaque quis. Hic ad dolore necessitatibus sequi eos repudiandae facilis. Maiores aspernatur tenetur.', NULL, 49, '2023-03-03 03:23:24', '2023-10-26 13:52:15'),
(7, 'article', 'voluptas repellendus officia odio animi', 'Vel repellat rem iste.', 'Corporis eligendi debitis provident officiis animi dolores ea ab sint. Perspiciatis praesentium ea non. Odio non ratione eos velit vero porro ad velit.\nEaque nisi doloremque nulla. Qui a sed in ratione eveniet dolor quibusdam saepe unde. Atque ut sunt doloremque nam enim.\nOdit veniam dignissimos quae facere alias. Et quod molestias doloribus inventore exercitationem veritatis corrupti distinctio ipsam. Repudiandae quibusdam quaerat perspiciatis quibusdam.', NULL, 18, '2022-11-11 13:40:28', '2023-10-26 12:30:53'),
(8, 'discussion', 'tempore assumenda nihil totam ratione', 'Architecto quibusdam quia commodi officia provident aliquid natus cupiditate.', 'Alias doloremque blanditiis veniam cum a cumque. Id commodi maxime dolor. Sapiente quod dolore voluptatibus quod ea corporis eveniet.\nEum modi consequuntur. Debitis placeat accusamus occaecati magnam dolorum voluptas. Consequuntur asperiores iure incidunt blanditiis.\nQuaerat esse nemo unde asperiores itaque. Voluptatem culpa illo corrupti at qui. Placeat tempora commodi a voluptatem ipsam.', NULL, 24, '2023-02-11 18:39:19', '2023-10-26 00:23:08'),
(9, 'article', 'in reprehenderit incidunt repellendus incidunt', 'Atque itaque soluta libero aliquid impedit aperiam eaque hic quis.', 'Provident ea dolor repellendus aliquam nobis mollitia earum. Inventore eligendi explicabo cumque sunt officia nulla. Illum amet cupiditate dolorum optio dolores sed magnam recusandae.\nDucimus veritatis sint consectetur dolorem numquam. Aut aperiam sapiente. Provident velit earum ipsa excepturi.\nOdit consequuntur dolorem. Harum aut tenetur temporibus eligendi ipsam molestias. Officiis distinctio corrupti nobis ex cum voluptatum odio.', NULL, 11, '2022-11-09 14:21:51', '2023-10-26 11:06:17'),
(10, 'discussion', 'iusto quod vitae error magnam', 'Quae sint explicabo nobis veniam.', 'Nobis soluta delectus. Omnis minus odit maiores quo quo beatae rerum neque. Qui modi enim repellat iusto minus quod nobis.\nQuod sed tenetur. Perspiciatis enim dignissimos necessitatibus tempora quos aut laboriosam. Eaque autem quis rerum quia.\nMollitia rerum suscipit. Quod error et esse rerum nostrum accusantium voluptatibus magni. In debitis earum quibusdam natus iusto.', NULL, 39, '2023-09-28 06:22:06', '2023-10-25 19:43:31'),
(11, 'discussion', 'dignissimos necessitatibus fugiat tempora rerum', 'Nulla optio nostrum accusamus vitae et libero.', 'Beatae tempore fugiat eos totam. Sint sed excepturi eligendi culpa laudantium esse. Libero dicta pariatur ut voluptatem omnis pariatur veniam fugiat porro.\nOdio nisi quia iusto velit. Porro dolorem quas fugiat. Eveniet ullam occaecati voluptate illo quam voluptate provident.\nId blanditiis iure maiores voluptates consequuntur suscipit qui ratione. Consectetur veritatis eos vitae laborum. Tempore ad non.', NULL, 19, '2022-12-31 08:49:32', '2023-10-25 20:05:22'),
(12, 'article', 'saepe et accusamus quos blanditiis', 'Aspernatur aliquam iusto.', 'Possimus harum aliquam earum. Fugiat placeat fuga ad incidunt consequuntur eos velit fugit quo. Atque nisi in enim fugit vel deserunt doloribus.\nQuisquam dolorum rerum nemo beatae. Ipsam ut esse. Facere eligendi facilis natus consectetur autem quo minima.\nVoluptatum ipsam natus sapiente unde eveniet blanditiis fuga. Optio itaque dolorem. Sit ab eveniet ad cumque reprehenderit.', NULL, 50, '2023-05-08 17:19:04', '2023-10-25 19:21:19'),
(13, 'article', 'aperiam fuga nam voluptatibus exercitationem', 'Quis iste minus soluta iusto nemo deserunt quis.', 'Illum ex aliquid dolores odit reiciendis officiis. Laborum provident incidunt corporis nihil sunt minima odit laudantium perferendis. Vero commodi corrupti repudiandae enim voluptas illo ipsum qui ea.\nNemo delectus et facilis debitis suscipit quam dolore. Aut doloribus maxime consequatur architecto culpa. Eius libero neque ea ea dolore.\nQuibusdam est pariatur. Quidem repellat inventore. Quisquam cum voluptatibus ab alias eveniet quasi repellat.', NULL, 6, '2023-08-19 22:35:18', '2023-10-25 16:17:54'),
(14, 'article', 'optio eius maxime soluta soluta', 'Nisi perferendis veritatis.', 'Reiciendis officiis dolorem qui necessitatibus. Reprehenderit voluptatem facere fugit exercitationem totam. Repudiandae odio alias maxime expedita aliquam reprehenderit optio commodi recusandae.\nQuam eveniet dignissimos sit. Nihil sapiente hic quaerat doloribus quisquam tempore eum dicta beatae. Labore dolores ipsum recusandae neque.\nEa iure consequatur alias at. Ratione optio minima qui magni rem aut. Exercitationem excepturi expedita occaecati fuga cum recusandae.', NULL, 27, '2023-01-21 22:00:56', '2023-10-25 19:07:00'),
(15, 'article', 'consequatur sed velit sit aperiam', 'Illum alias labore.', 'Occaecati provident distinctio aut odio optio. Laboriosam eaque impedit cumque sequi sunt perspiciatis tempore alias reiciendis. Quos sapiente ipsa at sequi corporis est.\nVeniam nihil ipsa ipsum. Quod debitis ipsa dicta inventore ipsa repudiandae doloremque dicta. Eius modi in magnam.\nAb dolorem perspiciatis. Amet atque iure quod odio libero quis corporis. Et repudiandae molestiae ipsum possimus earum vitae in quidem.', NULL, 26, '2023-05-31 05:09:54', '2023-10-26 13:18:06'),
(16, 'discussion', 'omnis tenetur nam itaque blanditiis', 'Voluptatem quo aperiam dolor.', 'Aperiam nisi eligendi ea tenetur. Vel error facilis ipsa voluptate fugiat cum laudantium. Fuga nesciunt unde blanditiis deleniti.\nIpsa dolores quasi veniam cum sequi at. Ipsum exercitationem natus quidem maiores ea ullam deserunt velit occaecati. Temporibus perspiciatis magnam doloremque.\nCorporis mollitia aspernatur modi eaque aut maiores commodi nulla quam. Vitae itaque ducimus mollitia eos molestias iure. Repellat voluptatibus labore perspiciatis incidunt vitae.', NULL, 15, '2023-03-02 08:59:55', '2023-10-26 09:42:18'),
(17, 'article', 'nesciunt voluptatem porro dicta odio', 'Rem reprehenderit cupiditate quia cupiditate.', 'Laborum ullam magnam. Accusantium aspernatur voluptate eligendi voluptatum deserunt est quod. Impedit ipsam vero nemo consequuntur eligendi omnis hic adipisci autem.\nMaxime quasi doloribus corporis. Facilis libero totam. Deleniti exercitationem repudiandae hic voluptas doloremque optio.\nNulla assumenda repellendus dolore ut dolore velit. Odit quidem esse neque inventore accusamus. Optio a vero quasi quibusdam animi aliquid quidem voluptatibus.', NULL, 42, '2023-03-04 06:40:41', '2023-10-25 16:41:17'),
(18, 'article', 'iste nam voluptatum unde porro', 'Debitis minus incidunt.', 'Facere ad odio velit voluptate vero cupiditate sint. Laborum esse eaque. Itaque laboriosam mollitia libero nihil.\nQuo iure doloremque nostrum incidunt. Sequi quae cupiditate recusandae aut id. Sapiente numquam sit ipsam error eaque porro eaque.\nIpsum nihil est reprehenderit error aspernatur dignissimos beatae earum. Ullam ex minima laborum nam. Quaerat illo minus.', NULL, 44, '2022-12-07 14:16:49', '2023-10-26 12:34:47'),
(19, 'discussion', 'quasi commodi asperiores quasi delectus', 'Nesciunt totam unde ex nisi culpa mollitia.', 'Expedita aspernatur cumque ducimus unde quidem veniam. A quae dolorum. Harum placeat earum ab.\nTempora labore rem pariatur tempore minus. Laboriosam architecto quas magni unde tempore. Doloremque nam vitae doloremque.\nEarum praesentium odit exercitationem. Quaerat illum totam adipisci minus. Neque tenetur sunt mollitia excepturi eveniet nulla quis necessitatibus tenetur.', NULL, 40, '2023-05-18 23:42:52', '2023-10-26 09:16:08'),
(20, 'discussion', 'doloribus ex debitis amet quam', 'Nostrum itaque ullam.', 'Ipsum et perferendis voluptatem quo labore. At ullam voluptates adipisci ipsa eaque similique. Repudiandae exercitationem reiciendis quae vero eius fuga.\nIllo dignissimos officia deserunt. Eaque vero quas alias non quo impedit suscipit officia eveniet. Modi unde labore molestias officiis recusandae.\nNecessitatibus nisi numquam. Quia rem ullam sed soluta tempora mollitia. Suscipit unde aut deserunt earum quaerat eaque repellendus voluptate voluptatum.', NULL, 5, '2023-10-17 16:03:23', '2023-10-26 05:18:18'),
(21, 'discussion', 'perspiciatis eaque esse numquam repudiandae', 'Architecto nesciunt impedit debitis rerum ratione et.', 'In excepturi reiciendis a rem omnis minima itaque. Voluptatibus fugiat explicabo delectus consectetur animi. Ipsa omnis quidem unde.\nNam at unde architecto ab suscipit nam enim porro aut. Reprehenderit nisi nemo earum necessitatibus tenetur similique ipsa eius. Cumque labore quos commodi harum id.\nSed repellendus sapiente magnam dolores quibusdam numquam suscipit cupiditate. Quia odio molestiae placeat. Rerum perferendis eos tempore animi quas iure quae distinctio suscipit.', NULL, 33, '2023-06-01 21:19:50', '2023-10-26 08:20:20'),
(22, 'article', 'natus possimus itaque delectus voluptatibus', 'Ullam vel a accusamus expedita eligendi tenetur architecto earum.', 'Expedita quisquam quod unde numquam harum ipsa repudiandae facilis. Itaque porro aut adipisci ducimus. Magni tempora nisi nesciunt.\nIste beatae nesciunt voluptates recusandae quasi. Alias excepturi earum. Dolor ducimus omnis at assumenda repellat nobis corporis.\nDoloribus ex ratione odio culpa et ipsum impedit quisquam atque. Facilis alias animi doloribus rem eveniet numquam. Quisquam velit dolor maxime assumenda sapiente quasi.', NULL, 50, '2023-03-12 21:41:44', '2023-10-26 02:11:08'),
(23, 'article', 'quo libero alias facilis error', 'Quasi voluptatem fuga sequi commodi nam doloremque odio aspernatur ducimus.', 'Vitae sit eaque ab facilis hic vitae. Delectus minus quaerat. Temporibus ut eligendi autem optio vero nesciunt nobis magnam veniam.\nDolores iste quaerat dignissimos nulla asperiores maxime minima atque odit. Quae modi unde accusamus atque necessitatibus fuga perferendis quibusdam error. Tempore esse minus voluptatibus vel suscipit sed dolorem neque.\nPerspiciatis iste libero quisquam voluptate reiciendis. Occaecati expedita ducimus sunt unde suscipit cumque ducimus odit iure. Dolor amet sunt natus.', NULL, 32, '2023-05-16 15:06:43', '2023-10-25 22:56:42'),
(24, 'article', 'facilis nihil dicta numquam commodi', 'Provident blanditiis eum quas eos nesciunt.', 'Occaecati nulla optio modi labore nostrum. Ducimus sapiente deserunt aut laborum aliquid. Molestias corrupti earum eaque reprehenderit nobis eligendi.\nPerferendis architecto fugiat. Sapiente ab illo assumenda numquam rerum laboriosam deleniti. Doloribus incidunt repudiandae dignissimos perferendis accusantium debitis.\nAsperiores eligendi aliquam fugiat fugiat veniam quaerat molestias ea soluta. Quia asperiores harum error at laborum voluptate repudiandae in. Culpa quam reiciendis pariatur reprehenderit temporibus debitis hic reprehenderit officia.', NULL, 14, '2023-04-11 10:09:06', '2023-10-26 01:15:59'),
(25, 'article', 'explicabo nesciunt maxime qui facilis', 'Maiores alias inventore voluptatem repellat deleniti.', 'Accusamus et praesentium voluptatum. Qui quasi quasi labore molestias est. Enim tempore sint excepturi quae rem eius dicta quae.\nSimilique deserunt quo eaque. Quisquam cumque veritatis beatae odio doloribus voluptates. Aliquam molestiae mollitia ex voluptate a culpa veniam.\nIpsum odit molestias. Labore ipsum porro tenetur ipsum accusantium laboriosam cupiditate consequatur animi. Amet vel dolorem magnam dolore.', NULL, 38, '2023-03-31 01:27:32', '2023-10-26 08:13:25'),
(26, 'discussion', 'reprehenderit quae facilis eum magni', 'Et cupiditate nostrum accusantium error vero ab nemo iste tempore.', 'Sunt quos eius. Eius nulla ea alias minus. In necessitatibus similique.\nAlias iusto dolor cumque. Occaecati doloribus veniam. Facilis quisquam dolor iste eum cupiditate inventore.\nFacilis quis aperiam fuga fugit neque placeat placeat sequi. Qui dolores perspiciatis quae quibusdam. Aliquid dolor accusamus.', NULL, 12, '2023-08-03 17:40:28', '2023-10-25 16:03:46'),
(27, 'discussion', 'sequi voluptatem alias aliquam cupiditate', 'Amet sit eum voluptatum corrupti a quo.', 'Fugit consequatur veniam. Accusamus id quam dolore sequi dolore earum. Voluptatem at aspernatur.\nArchitecto veniam illum in alias. Voluptate cumque perspiciatis. Ex tempore nesciunt animi dolorum.\nMaxime quos soluta. Nobis placeat error quidem a doloribus est. Vero temporibus cum nihil perspiciatis laborum nisi reprehenderit.', NULL, 44, '2023-09-18 16:26:37', '2023-10-26 12:14:58'),
(28, 'article', 'id laborum delectus facilis voluptatibus', 'Fuga optio reprehenderit rerum at doloribus autem provident veniam nesciunt.', 'Quasi tempora occaecati a consectetur alias alias aperiam. Minima consectetur qui molestiae dicta exercitationem iure. Ab illo aliquam fugit asperiores.\nUllam eum sequi illum similique unde aut fuga dolores. Vel officia sit. Aliquam consectetur magni libero expedita suscipit unde.\nQuod omnis illo. Cupiditate nemo sit numquam repellendus. Ducimus voluptatum laborum.', NULL, 9, '2023-07-29 12:16:11', '2023-10-26 04:23:02'),
(29, 'discussion', 'modi sapiente aperiam consectetur voluptas', 'Eveniet aperiam debitis ab.', 'Necessitatibus ipsam repudiandae pariatur. Enim quis inventore officiis quis quis. Veritatis libero distinctio.\nIncidunt illum quasi voluptatem in molestias tempore est. Necessitatibus aspernatur ex commodi. Est officiis laudantium placeat dolorem nemo.\nOfficiis eius expedita. Amet beatae nulla omnis reiciendis in ut tempora ab earum. Accusantium deleniti maiores doloribus id maiores a impedit.', NULL, 10, '2022-12-17 15:06:23', '2023-10-25 21:12:51'),
(30, 'discussion', 'fuga vel debitis deserunt atque', 'Iusto earum quibusdam beatae ipsa repudiandae veniam qui consequuntur.', 'Quia molestias quos libero neque. Facilis eligendi dolorem iusto molestiae. Voluptatibus aliquam modi iure minima vitae.\nEligendi in esse incidunt itaque minus consequatur dolore facere repellat. A veniam unde ipsa repellendus nam earum porro aliquam cupiditate. Itaque ab distinctio perspiciatis quo quam.\nOccaecati sed esse rem unde tempora quam expedita numquam. Quae velit fuga aliquid. Consectetur quas voluptate at esse doloribus eos magni accusamus.', NULL, 46, '2023-10-24 02:46:07', '2023-10-26 03:38:43'),
(31, 'discussion', 'ducimus nam quas culpa nihil', 'Pariatur aut dicta quas delectus quaerat quia est alias.', 'Ipsum tempore earum id fugit quasi repellendus harum itaque aspernatur. Aliquam aspernatur vitae voluptates accusantium. Error alias architecto natus itaque accusantium.\nEaque dolorem magni eligendi consequuntur repellat. Est repellendus amet suscipit repudiandae quidem nemo officia. Quod necessitatibus rem accusantium necessitatibus consequatur esse sunt cupiditate.\nCorporis blanditiis eveniet excepturi quae quasi perferendis saepe officia. Culpa autem voluptates. Quasi temporibus sed dolor temporibus totam pariatur provident.', NULL, 38, '2023-02-09 14:22:34', '2023-10-26 02:53:13'),
(32, 'article', 'iusto magnam doloremque nulla illo', 'Fuga provident at atque nobis consequuntur quo sit.', 'Eligendi vitae aliquid saepe. Occaecati molestiae dolorem nulla eos. Esse alias sed quas sequi.\nAccusamus ducimus debitis a nostrum nemo. Praesentium adipisci totam quas eos illum. Qui quas alias deleniti natus accusantium at deleniti perferendis.\nAliquid commodi accusamus voluptatibus voluptatibus iure. Doloremque quasi consequatur eaque unde tenetur id impedit dolore. Sequi tenetur facere voluptates perspiciatis molestias similique.', NULL, 8, '2023-07-24 03:33:03', '2023-10-25 20:37:14'),
(33, 'discussion', 'corrupti aliquam quod nihil accusamus', 'Minima voluptatem nesciunt ab qui.', 'Vitae quaerat repellendus quas ipsa quo adipisci dolor. Facere esse perferendis libero recusandae dolore. Autem recusandae iusto.\nEsse illo quos ipsam eum quis optio. Iste aliquam alias quod tenetur id illum laudantium voluptate ut. Quibusdam mollitia doloribus placeat soluta ipsam illum molestiae.\nVitae veniam exercitationem nam accusantium iure libero nam. Quae officia exercitationem eveniet ratione. Praesentium corporis beatae tenetur odio dolor illum.', NULL, 10, '2023-09-13 13:32:44', '2023-10-26 03:30:00'),
(34, 'article', 'tempora ex repellat error autem', 'Officiis laboriosam sed dolores voluptates corporis quas excepturi optio.', 'Repellat animi nemo. Officiis minima veritatis officiis ipsum blanditiis. Voluptatum illum eos explicabo nulla voluptas qui ad inventore animi.\nEius rerum ducimus eos esse quis reiciendis repellat sequi maiores. Veniam exercitationem consequatur excepturi. Magnam optio pariatur eligendi placeat amet suscipit.\nInventore quaerat molestiae sed corrupti voluptas repudiandae cum. Minus deserunt aut architecto eos. Doloribus iste ducimus numquam recusandae dicta provident id.', NULL, 48, '2023-07-10 17:28:19', '2023-10-26 00:17:19'),
(35, 'article', 'officiis labore atque perferendis tempora', 'Ab tenetur similique est blanditiis odio sunt nam.', 'Delectus aliquam cumque porro autem odio voluptatibus tempora natus rerum. Expedita repellendus quisquam voluptatibus placeat porro. Facere est facere neque dolorum.\nQuis aliquid cupiditate cum eveniet ex quaerat delectus deserunt architecto. Omnis natus ea. Est cum non.\nCorrupti consequuntur dolor dolores accusamus qui. Perferendis repellendus vitae accusantium a. Consectetur modi repellendus facere ut.', NULL, 3, '2023-07-01 05:21:52', '2023-10-26 06:29:16'),
(36, 'article', 'atque animi vel doloremque eaque', 'Adipisci maxime est enim expedita amet sequi accusamus.', 'Totam incidunt perspiciatis ullam quod. Veritatis quasi ea vitae dicta ab id. Temporibus eum perferendis.\nReiciendis quasi deserunt. Aut deserunt ea quod blanditiis harum iusto aspernatur. Dicta consequuntur accusamus ipsa.\nDignissimos saepe occaecati. Quibusdam nemo ratione quas ullam iusto occaecati nam itaque ex. Quod eveniet atque quos fugit quasi.', NULL, 43, '2022-12-22 21:33:34', '2023-10-25 19:08:02'),
(37, 'discussion', 'accusantium numquam assumenda cumque impedit', 'Earum cumque aut.', 'A voluptatibus magnam ab eum. Quisquam reiciendis fugit. Eaque totam accusantium ipsa sed cupiditate blanditiis sequi.\nCulpa ipsa aliquid qui soluta delectus suscipit dolor amet quidem. Quibusdam voluptatum nulla temporibus earum quidem. Iste illo occaecati facilis voluptas corrupti iusto vel.\nEum laudantium at ea delectus autem consequatur quos cumque. Sint natus asperiores adipisci. Ipsam molestias assumenda pariatur aut iste veniam praesentium fuga ullam.', NULL, 47, '2022-11-26 04:11:00', '2023-10-26 07:49:04'),
(38, 'discussion', 'rem voluptas consequuntur sunt dolores', 'Cumque laborum eum sapiente quam numquam et modi minima.', 'Alias pariatur dolorum incidunt dicta necessitatibus eaque cupiditate. Libero aspernatur suscipit libero eius mollitia dolor. Nemo nemo reiciendis.\nOmnis cum qui voluptate nihil molestias consequatur fuga ipsa aliquam. Ducimus voluptates consectetur modi sint ex similique reiciendis. Facilis consequatur impedit illum tempore rem.\nOccaecati veritatis suscipit temporibus illum at corrupti ipsa. Amet quos perferendis fugiat accusantium corrupti hic non deleniti harum. Ullam quas atque autem natus dolores tenetur.', NULL, 12, '2023-10-08 13:10:24', '2023-10-26 13:21:35'),
(39, 'article', 'illum minima illo incidunt alias', 'Quasi ad earum animi.', 'Deserunt laudantium rerum odio quis hic exercitationem nobis quod quo. Corporis provident quas ducimus dolore ab. Tempore mollitia quod aliquam dolore.\nRatione corporis iste officiis adipisci. Repudiandae voluptate assumenda asperiores assumenda. Consequuntur sint distinctio nostrum inventore culpa.\nAperiam dolore molestiae adipisci consequatur molestiae cupiditate explicabo accusantium. Nemo consectetur aliquid aperiam ut eligendi odit vitae. Laboriosam odio ipsa officiis.', NULL, 21, '2023-08-11 11:57:15', '2023-10-26 12:45:34'),
(40, 'article', 'omnis dolore quae placeat ducimus', 'Beatae dolorum illo ducimus sit ab.', 'Voluptates aperiam blanditiis dolor alias rem aut unde repellendus animi. Corrupti facilis dolores similique at eius voluptate. Molestiae delectus nisi ab ducimus.\nAb aliquam reprehenderit mollitia non dolore. Pariatur minima cum distinctio. Ut illo sit voluptates reprehenderit.\nQuae atque delectus quos doloribus ea repellendus voluptatem. Ratione tenetur repellat ipsam ab commodi. Provident ipsam ab atque placeat illum.', NULL, 1, '2023-06-04 09:08:22', '2023-10-26 05:54:25'),
(41, 'discussion', 'ipsam ipsum natus illo cum', 'Nulla sint distinctio aut maiores et temporibus est libero sed.', 'Cum recusandae aut. Iure culpa tempore sed. Esse consequuntur voluptatem blanditiis doloremque repellendus.\nConsequuntur ducimus qui animi adipisci reprehenderit tempore quas sed similique. Quam ab nulla molestias odit eius possimus. Provident voluptate sit.\nIusto explicabo quo repellat quam blanditiis. Expedita voluptatibus modi deleniti cumque fugiat odit ipsa quisquam adipisci. Porro laboriosam eius quae necessitatibus.', NULL, 11, '2023-05-27 19:27:43', '2023-10-26 09:07:27'),
(42, 'article', 'recusandae blanditiis eveniet sit debitis', 'Labore quisquam ab porro debitis.', 'Minima quibusdam doloremque cupiditate repellat doloribus maxime. Id facere illum blanditiis necessitatibus voluptas. Id repudiandae laborum sequi quo adipisci eligendi cum aliquam.\nAb voluptatem maxime veritatis sed nihil ipsa reprehenderit eum at. Dolore quos eos iste id architecto alias quas. Voluptatem nesciunt tempore corrupti dolorum dolor.\nQuae sunt laudantium inventore numquam. Aut non voluptate amet deserunt nulla fuga modi architecto. Reiciendis atque sit dolor sint excepturi.', NULL, 27, '2022-12-06 10:35:39', '2023-10-26 11:08:06'),
(43, 'article', 'nam fugit necessitatibus dicta rerum', 'Vero voluptate vel ratione facere officiis dolorem enim veniam dolorem.', 'Necessitatibus nemo repellat soluta. Sit natus assumenda non beatae alias provident ipsum aliquam laboriosam. Rerum blanditiis nemo dolor quam.\nConsectetur excepturi dolor labore. Eligendi exercitationem nisi harum nisi non. Aspernatur molestiae cum quis omnis asperiores perspiciatis.\nFuga reprehenderit dolorum non sed beatae iste neque. Unde dignissimos eos nam voluptatibus laudantium. Suscipit quos quas eveniet dolorum libero reprehenderit.', NULL, 32, '2023-05-29 23:32:29', '2023-10-26 05:51:48'),
(44, 'discussion', 'accusantium porro illo delectus repellendus', 'Aliquid perferendis consectetur libero commodi pariatur iusto fuga perspiciatis libero.', 'Aperiam quasi consectetur ipsa fugiat necessitatibus est dolore unde expedita. Dolorem qui facilis eveniet recusandae neque animi voluptates distinctio. Ratione provident autem iure repudiandae quibusdam dolore doloremque.\nTemporibus numquam consequatur officia provident mollitia commodi facere. Corrupti nesciunt fuga impedit pariatur pariatur voluptatibus fuga minima possimus. Earum incidunt ut id error voluptate ipsum animi.\nDicta debitis adipisci officia et perspiciatis assumenda. Dolorem ea ducimus natus molestiae sequi modi veniam quod. Doloremque provident consectetur esse.', NULL, 4, '2022-11-15 11:39:02', '2023-10-26 07:07:17'),
(45, 'discussion', 'cupiditate recusandae tenetur sunt quas', 'Animi ut iure consequuntur ea adipisci quos id veritatis inventore.', 'Distinctio libero exercitationem. Odio iste aliquid. Aliquid facere asperiores optio consequatur.\nUnde natus cupiditate beatae reprehenderit velit illum. Accusantium qui officiis exercitationem excepturi culpa quis necessitatibus sequi. Soluta vero quam quae consequatur ullam porro.\nNumquam voluptatem aut aspernatur maiores vel cumque quasi. Debitis expedita delectus ratione. At beatae vero cupiditate praesentium id illum.', NULL, 44, '2022-11-06 07:16:05', '2023-10-26 02:27:48'),
(46, 'article', 'suscipit consectetur placeat architecto tempora', 'Nobis aspernatur accusamus praesentium provident excepturi voluptate eveniet voluptate.', 'Veniam quasi cum vitae. Amet natus eos cumque modi nisi suscipit praesentium. Error totam praesentium qui doloremque aspernatur.\nVitae porro minus molestiae possimus libero voluptatem quis. Quo molestiae quos tempore nihil delectus at dolorem architecto. Sequi tempora dolorem dolores.\nAliquam sit vero alias recusandae doloribus. Consequatur consectetur repellendus aperiam harum. Repellat excepturi dignissimos ea maxime tempora quos.', NULL, 6, '2023-08-05 05:04:42', '2023-10-26 06:20:02'),
(47, 'article', 'est nemo architecto repudiandae perferendis', 'Fugiat rerum eos expedita ipsum ut ipsam veritatis maxime facilis.', 'Sapiente dicta corrupti nisi ratione deserunt earum deleniti repellendus molestiae. Asperiores aliquam tempora odit modi fugit accusamus aut. Temporibus reiciendis quae delectus possimus doloribus nisi voluptate.\nQuaerat ad pariatur praesentium. Fuga impedit molestiae officia repudiandae fugiat. Aperiam quod consequatur.\nExcepturi corrupti quisquam quam veniam alias quia dolor hic laudantium. Ipsam odio nisi cupiditate culpa quam ab veritatis ea. Necessitatibus ipsum repellendus et quisquam.', NULL, 24, '2023-06-12 23:56:46', '2023-10-26 06:11:52'),
(48, 'discussion', 'expedita odit molestiae vel voluptatum', 'Esse odit itaque dolorum ad reprehenderit rerum voluptatem architecto consequatur.', 'Assumenda voluptate non. Nesciunt voluptatum animi magni cum voluptatibus fugiat iure ipsum iure. Dignissimos earum dicta.\nAccusamus laboriosam quas amet distinctio nemo debitis. Alias porro libero atque consequatur fugit asperiores corrupti velit aspernatur. Nulla sequi vitae sed libero.\nTempore quibusdam animi ad rerum iste. Officia veniam explicabo. Quas pariatur cumque eum molestias id voluptates itaque architecto.', NULL, 27, '2022-12-30 14:28:05', '2023-10-26 11:17:06'),
(49, 'article', 'explicabo a quisquam est aperiam', 'Provident facere eveniet cupiditate eius eligendi sint vitae eligendi.', 'Et placeat veniam occaecati labore accusamus modi eveniet voluptas. Dolorum expedita velit natus sint accusamus quia occaecati sapiente. Enim quis mollitia labore.\nEnim iure exercitationem aliquid ex aliquid molestias. Rerum est voluptates ad autem fugiat saepe laborum. Quaerat odio labore officiis tempora atque eaque cumque expedita nam.\nEnim expedita ea quasi quia occaecati. Ipsum magni voluptatem officiis incidunt. Sint et quis ut.', NULL, 19, '2023-02-17 11:01:38', '2023-10-26 14:33:41'),
(50, 'article', 'non iste pariatur autem illum', 'Voluptates aliquid quam vero distinctio fugit magni.', 'Non sint ea tempore ut facere nemo error odio. Porro soluta veniam. Magni provident ipsum et nisi dolores quidem sed nam.\nPraesentium voluptatem nesciunt minus explicabo doloremque provident in quas minima. Itaque ea consequatur optio unde tempore fuga reiciendis atque. Facere sunt repellendus repellendus aperiam.\nDignissimos odio provident mollitia libero. Debitis eum delectus asperiores in corrupti enim. Repudiandae quibusdam a perferendis a voluptate cum.', NULL, 3, '2023-08-25 00:12:49', '2023-10-26 06:30:25');

-- --------------------------------------------------------

--
-- Structure de la table `publication_categories`
--

CREATE TABLE `publication_categories` (
  `id_publication` int(11) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `publication_categories`
--

INSERT INTO `publication_categories` (`id_publication`, `id_category`) VALUES
(9, 1),
(10, 1),
(11, 1),
(21, 1),
(26, 1),
(32, 1),
(35, 1),
(37, 1),
(49, 1),
(14, 2),
(29, 2),
(30, 2),
(36, 2),
(17, 3),
(19, 3),
(21, 3),
(30, 3),
(40, 3),
(46, 3),
(49, 3),
(2, 4),
(14, 4),
(16, 4),
(28, 4),
(38, 4),
(2, 5),
(22, 5),
(25, 5),
(32, 5),
(49, 5),
(4, 6),
(17, 6),
(18, 6),
(27, 6),
(40, 6),
(13, 7),
(20, 7),
(28, 7),
(32, 7),
(39, 7),
(45, 7),
(49, 7),
(7, 8),
(15, 8),
(33, 8),
(36, 8),
(37, 8),
(38, 8),
(40, 8),
(42, 8);

-- --------------------------------------------------------

--
-- Structure de la table `publication_reputations`
--

CREATE TABLE `publication_reputations` (
  `id_user` int(11) NOT NULL,
  `id_publication` int(11) NOT NULL,
  `reputation_value` int(11) NOT NULL
) ;

--
-- Déchargement des données de la table `publication_reputations`
--

INSERT INTO `publication_reputations` (`id_user`, `id_publication`, `reputation_value`) VALUES
(2, 31, -1),
(5, 40, -1),
(6, 32, -1),
(6, 37, -1),
(8, 9, -1),
(8, 11, -1),
(8, 12, 1),
(8, 28, 1),
(8, 45, 1),
(9, 23, -1),
(9, 46, -1),
(10, 45, -1),
(13, 29, 1),
(13, 30, 1),
(15, 2, -1),
(16, 11, 1),
(16, 16, -1),
(17, 5, 1),
(17, 29, -1),
(18, 46, 1),
(19, 2, 1),
(22, 17, -1),
(22, 23, 1),
(22, 31, 1),
(27, 45, 1),
(28, 14, 1),
(28, 19, -1),
(28, 30, -1),
(29, 10, -1),
(30, 43, -1),
(31, 27, 1),
(31, 43, -1),
(33, 32, 1),
(34, 7, -1),
(35, 47, -1),
(37, 5, -1),
(38, 29, -1),
(39, 43, -1),
(41, 34, -1),
(41, 37, 1),
(42, 48, 1),
(46, 36, 1),
(47, 39, -1),
(47, 41, -1),
(48, 10, -1),
(48, 35, 1),
(49, 5, 1),
(49, 27, -1),
(50, 34, -1),
(50, 49, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('M','F','O') DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `web_url` varchar(255) DEFAULT NULL,
  `date_registration` datetime NOT NULL,
  `role` enum('administrator','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `gender`, `first_name`, `last_name`, `avatar`, `biography`, `skills`, `web_url`, `date_registration`, `role`) VALUES
(1, 'admin', 'admin@admin.com', '$2b$10$paTv4CctoI1VM.uJFRgneeBcGchfjX32tpmEgYd/9ntE.w6OK1XBe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-10-26 15:55:38', 'administrator'),
(2, 'user', 'user@user.com', '$2b$10$z0qHmS54skdCbp0MVEDSseD5hLbVFxpmYkDcPf3FeUFLuX9tTZ2tG', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-10-26 15:55:45', 'user'),
(3, 'Michele.Guillot8', 'Rachid_Paul@yahoo.fr', 'GyjSzg7bW0KxjMX', 'F', 'Alcyone', 'Baron', NULL, 'Reprehenderit repellat officia quibusdam sed porro. Suscipit delectus cum sequi expedita doloribus non reprehenderit ratione modi. Illum fugit sequi in quam ducimus harum.', 'nemo natus magnam error', 'https://mature-membre-titulaire.fr', '2023-02-24 03:15:02', 'administrator'),
(4, 'Alcide77', 'Iris_Olivier@yahoo.fr', 'iPvlWBqRj0gymEq', 'O', 'Jourdain', 'Brun', NULL, 'Qui reprehenderit odio odio error minus nobis. Quos laudantium voluptatibus distinctio at dolores at ipsam. Minima dolore perspiciatis tempora.', 'ipsa aspernatur nesciunt ullam', 'https://vorace-commis.info/', '2023-04-01 05:22:53', 'user'),
(5, 'Malo.Leclerc', 'Abeline_Gautier@gmail.com', '4_cbsfWd9Hqyezb', 'F', 'Althée', 'Bonnet', NULL, 'Animi blanditiis earum est voluptatem porro. Quod mollitia est consectetur eius itaque. Est facere aut natus necessitatibus.', 'praesentium tempore minus quibusdam', 'https://aimable-corps-enseignant.net/', '2023-01-16 08:07:59', 'administrator'),
(6, 'Ariane_Fabre27', 'Clarence.Clement66@gmail.com', 'gnn2hqY4d2MLkG2', 'F', 'Soline', 'Legrand', NULL, 'Totam velit porro ducimus delectus fuga laudantium. Voluptatum sit commodi explicabo. Reprehenderit illum ex pariatur.', 'sequi aut excepturi accusantium', 'https://brave-membre-du-personnel.com', '2023-04-14 19:56:37', 'user'),
(7, 'Hermine64', 'Auxence.Guillaume89@yahoo.fr', 'gT3jqu38WgjNl8E', 'M', 'Alix', 'Martinez', NULL, 'Sunt neque doloribus quis quidem cumque modi. Repellat corporis reiciendis consequatur non culpa. Qui eum accusamus officia recusandae quaerat iusto quidem occaecati autem.', 'vero voluptatibus voluptatibus pariatur', 'https://bleme-guide.fr', '2023-06-25 22:48:27', 'administrator'),
(8, 'Jerome.Fabre', 'Savinien75@yahoo.fr', 'QhieTX4BBUznP7y', 'F', 'Jehanne', 'Francois', NULL, 'Debitis error animi odio. Laborum minima est esse quisquam culpa placeat. Mollitia nesciunt aspernatur ducimus unde excepturi qui officia autem.', 'illo error rerum quibusdam', 'https://incalculable-diplomate.com/', '2023-09-22 21:03:40', 'user'),
(9, 'Aurele18', 'Amaryllis7@yahoo.fr', '1Vev53gF5D1NVWe', 'M', 'Aglaé', 'Laurent', NULL, 'Magnam repudiandae repellat natus reiciendis asperiores at sapiente dicta quia. Laboriosam itaque corrupti inventore numquam eveniet aperiam. Similique exercitationem expedita perferendis consequatur delectus ullam corporis corrupti.', 'commodi maiores consectetur repudiandae', 'https://sincere-dietetiste.net', '2023-07-25 17:18:41', 'administrator'),
(10, 'Angeline.Dufour10', 'Primerose.Boyer90@hotmail.fr', 'EaotS_LSLR9HEw8', 'F', 'Aimé', 'Gaillard', NULL, 'Possimus iste nobis vitae nulla corrupti quidem. Officia maiores aut. Possimus eum consequuntur molestiae placeat esse quasi eveniet fuga.', 'placeat est tenetur tempore', 'https://delectable-corps-enseignant.info/', '2023-05-08 09:04:26', 'user'),
(11, 'Ameline.Giraud43', 'Laurane97@gmail.com', 'aXytdyTidgueqVh', 'F', 'Maxime', 'Picard', NULL, 'Harum praesentium architecto a inventore dolores. Temporibus repudiandae ut id sequi blanditiis laborum. Beatae similique quasi error deserunt error.', 'excepturi voluptatibus veniam recusandae', 'https://vaste-corps-enseignant.org', '2023-03-28 06:52:26', 'user'),
(12, 'Christiane21', 'Xaviere53@hotmail.fr', 'Ys3Cyv_4I0kgnZl', 'F', 'Rodrigue', 'Pierre', NULL, 'Corrupti beatae porro ipsa maxime labore eaque sequi nulla. Explicabo minus iure voluptatibus possimus quis molestiae. Veritatis alias eveniet necessitatibus beatae dolorem necessitatibus.', 'laboriosam repudiandae alias amet', 'https://acre-hote.eu', '2023-02-12 15:06:39', 'user'),
(13, 'Innocent.Roussel78', 'Alcine3@gmail.com', 'M6cZFQm_zTlRTSC', 'M', 'Agrippin', 'Guillaume', NULL, 'Voluptas veritatis ex saepe. Magnam quia delectus debitis ad omnis quos dignissimos ad quas. Adipisci sunt similique voluptates rerum.', 'consequuntur nemo consequuntur vel', 'https://extra-delegation.org', '2023-05-26 00:46:34', 'user'),
(14, 'Agnes.Marty', 'Estelle_Paul93@hotmail.fr', 'DlF5XbzNpTeqrIX', 'O', 'Charlemagne', 'Brunet', NULL, 'Commodi voluptates dignissimos tempore. Ad nemo consectetur. Culpa doloremque nisi eius.', 'laborum ipsam asperiores beatae', 'https://acre-communaute-etudiante.com/', '2023-05-04 13:56:28', 'user'),
(15, 'Florence1', 'Yolande_Roux@hotmail.fr', 'Dg3fATkYmz1XTEA', 'F', 'Francine', 'Gautier', NULL, 'Recusandae cum distinctio numquam omnis. Nobis aliquid eius ex facilis quia illum. Laudantium eveniet ullam voluptates adipisci placeat earum recusandae corporis.', 'consectetur ratione numquam aliquam', 'https://mince-chef.name', '2023-02-05 18:52:42', 'user'),
(16, 'Andoche60', 'Adrien46@gmail.com', 'Fnzgl4cPJfaDESX', 'O', 'Longin', 'David', NULL, 'Sequi esse corporis aut maiores modi perspiciatis repudiandae quaerat cum. Dolore quidem earum ea. Aliquid at ea expedita excepturi minus aspernatur blanditiis eveniet.', 'vitae odit ut repellat', 'https://hebdomadaire-lectorat.info', '2023-02-19 15:14:48', 'administrator'),
(17, 'Doriane.Lemoine', 'Julie51@gmail.com', 'YeksUn6V1sKWcPM', 'O', 'César', 'Roussel', NULL, 'Maxime placeat deserunt culpa fuga voluptatem saepe veniam. Porro commodi cupiditate eum ipsa distinctio. Porro tempora non ab suscipit deleniti ea enim pariatur.', 'iure fuga iste eaque', 'https://rose-antagoniste.com', '2023-07-10 17:24:40', 'user'),
(18, 'Albane.Duval39', 'Axel21@yahoo.fr', 'YJRfpaATmtJ59TR', 'O', 'Dimitri', 'Collet', NULL, 'Laborum possimus ipsum odio minus ut laborum. Et tenetur debitis voluptate earum laudantium iusto. Provident tenetur in id.', 'amet tempore consequatur labore', 'https://espiegle-membre-a-vie.com/', '2023-02-16 10:28:23', 'administrator'),
(19, 'Briac.Dumont', 'Thierry.Marchand59@gmail.com', 'vohly3XN05jxgqg', 'M', 'Capucine', 'Julien', NULL, 'Facilis blanditiis sunt. Illum vitae quis. Veritatis impedit atque laudantium.', 'recusandae possimus porro praesentium', 'https://pacifique-gens.name', '2022-10-27 18:59:22', 'user'),
(20, 'Ameliane.Lefevre28', 'Bernard39@hotmail.fr', 'UkbFPgmiZScyViO', 'O', 'Jason', 'Rousseau', NULL, 'Alias dicta repellendus voluptatibus. Repellendus veniam sint inventore dolorem quasi sit mollitia corporis. Architecto odit quidem facilis minus similique doloremque natus suscipit.', 'praesentium asperiores doloribus quo', 'https://rose-juriste.net', '2023-01-31 03:48:22', 'user'),
(21, 'Ange69', 'Remi83@yahoo.fr', 'PuQFAQexgyRnqHF', 'M', 'Alice', 'Berger', NULL, 'Eius dolores perspiciatis excepturi ipsa unde ad. Iste dolor labore temporibus quas provident qui deleniti repellat. Culpa ut asperiores et rem consequuntur quas eos.', 'autem atque necessitatibus eius', 'https://tranquille-antagoniste.com', '2023-04-13 10:37:40', 'user'),
(22, 'Savin_Marie', 'Angelina84@yahoo.fr', 'cXTPtsj661isecH', 'M', 'Fantin', 'Henry', NULL, 'Hic veritatis eos veniam earum quo. Rerum necessitatibus architecto et tempore nisi dolor eaque tenetur. Temporibus officia fuga nobis distinctio iure cum cumque.', 'placeat saepe consectetur accusantium', 'https://neutre-triathlete.name', '2023-01-17 08:38:59', 'administrator'),
(23, 'Aurele.Fleury', 'Brunehilde98@gmail.com', 'DuYe_QeXYgnI6dQ', 'F', 'Astride', 'Guerin', NULL, 'Ut cupiditate iusto. Voluptatibus ducimus ex. Aspernatur non numquam possimus vel adipisci magni repellendus illo itaque.', 'delectus assumenda possimus itaque', 'https://minuscule-administration.com', '2023-06-10 13:58:57', 'administrator'),
(24, 'Abdonie_Prevost35', 'Annabelle_David66@hotmail.fr', 'UUuKfKlbJbtoqZm', 'F', 'Agneflète', 'Rousseau', NULL, 'Dolor adipisci culpa repellat. Eos laudantium excepturi necessitatibus quod tenetur dignissimos sint dolorum in. Rem distinctio consequatur eaque sed soluta quae non.', 'non suscipit modi amet', 'https://charitable-rectorat.org', '2023-06-27 19:06:35', 'administrator'),
(25, 'Diane79', 'Clarence_Jacquet59@yahoo.fr', 'beTgLEpqyyk76zd', 'F', 'Lothaire', 'Riviere', NULL, 'Tenetur similique quos tempora deserunt eos dolore vero sunt. Commodi voluptatem consequatur consequuntur aspernatur vero maiores. Omnis quo repellat vitae maiores aliquam voluptatem.', 'saepe ipsam in ab', 'https://fourbe-camarade.com/', '2023-06-19 05:27:31', 'administrator'),
(26, 'Isabeau96', 'Xenophon_Roger71@hotmail.fr', 'QvBd7qtRB31BY_7', 'O', 'Simon', 'Lemoine', NULL, 'Minima exercitationem tenetur. Nostrum perspiciatis ad atque fugiat rerum. Quasi amet velit doloribus autem id quisquam deleniti possimus quae.', 'consectetur a accusamus ratione', 'https://extra-rectorat.fr', '2022-11-12 06:16:32', 'administrator'),
(27, 'Venceslas25', 'Adalbaude38@gmail.com', 'MrjBOr9NcKN7Flc', 'M', 'Simon', 'Guyot', NULL, 'Sunt magnam vel animi officia dolore assumenda quibusdam iure vero. Laudantium ipsum ipsa dicta. Doloribus officia in perferendis explicabo magnam reiciendis molestiae.', 'officiis dolore sit deleniti', 'https://insipide-fonctionnaire.eu', '2022-12-22 01:22:52', 'user'),
(28, 'Pierre23', 'Ambroisie_Charles91@gmail.com', 'WiuqWA1C3ZEU1Sq', 'O', 'Mégane', 'Bourgeois', NULL, 'Modi ipsa ea modi dolore minima. Harum tenetur corporis possimus iure aliquam. Ex quasi distinctio sunt magnam odio dicta provident consequuntur.', 'architecto harum quaerat deserunt', 'https://avare-porte-parole.info', '2023-06-08 15:00:52', 'administrator'),
(29, 'Melissa.Martinez77', 'Emilie99@gmail.com', 'EVvyBu9kbDt6SUV', 'O', 'Raoul', 'Garnier', NULL, 'Sint tempora illo consequatur. Id illo tempore. Amet perspiciatis facere aliquam.', 'cumque id occaecati dicta', 'https://snob-adversaire.org', '2023-08-24 07:57:07', 'user'),
(30, 'Remi4', 'Amandin_Aubert@yahoo.fr', 'L8HKwwCHDiy2482', 'M', 'Arlette', 'Giraud', NULL, 'Temporibus nostrum delectus esse tempora. Corrupti quo libero tenetur laudantium occaecati asperiores sed beatae repellat. Hic autem nisi quidem in officiis expedita.', 'eveniet unde reprehenderit sit', 'https://sauvage-partenaire.fr/', '2023-01-11 12:15:50', 'administrator'),
(31, 'Charles.Lecomte', 'Michael49@yahoo.fr', 'T31OhZRpe6jK4qk', 'M', 'Aude', 'Aubert', NULL, 'Perspiciatis excepturi voluptatibus suscipit ex optio. Commodi occaecati tenetur minima sed. Eos quidem eos molestiae nisi magnam exercitationem aut impedit.', 'corrupti inventore in beatae', 'https://considerable-jeune-enfant.org', '2022-11-09 08:30:44', 'administrator'),
(32, 'Irene9', 'Felix36@yahoo.fr', 'pIImkdXTjeU5rmS', 'O', 'Firmin', 'Gerard', NULL, 'Voluptate tenetur quaerat fugiat. Debitis atque quia sequi itaque provident quaerat id pariatur corrupti. Quisquam quibusdam iusto consequuntur earum corporis accusantium possimus molestias blanditiis.', 'laboriosam soluta amet accusamus', 'https://temeraire-personnel.eu', '2023-08-13 23:11:30', 'user'),
(33, 'Corentine_Marchal74', 'Ange_Aubert@yahoo.fr', 'qVVxpWtTocBlfwH', 'M', 'Ozanne', 'Meunier', NULL, 'Nihil sapiente earum sequi minus. Praesentium alias iusto ea quo commodi repudiandae. Eos non nobis libero cum molestias iste repudiandae illo.', 'odio occaecati magni eveniet', 'https://sympathique-electorat.info/', '2023-09-26 19:04:36', 'administrator'),
(34, 'Ambroisie.Carre', 'Tatiana.Bonnet@yahoo.fr', 'RrCRe6w4XZyN1LC', 'F', 'Abdonie', 'Chevalier', NULL, 'Facilis molestiae delectus ipsa at. Assumenda nihil explicabo. Assumenda doloribus laborum ea officia magni reiciendis.', 'magni quae maiores occaecati', 'https://brusque-dietetiste.name', '2023-06-19 02:46:28', 'administrator'),
(35, 'Aldonce.Renard', 'Macaire_Mathieu@gmail.com', '20vTFq8QXmz01ky', 'O', 'Aline', 'Blanchard', NULL, 'Quo corporis delectus atque. Veritatis magni laborum ad. Itaque accusamus quod sint illum adipisci ipsa quos.', 'impedit reprehenderit laudantium dicta', 'https://perplexe-commis-de-cuisine.fr/', '2023-10-03 16:20:32', 'user'),
(36, 'Albane_Nguyen19', 'Zephirin.Roger5@yahoo.fr', 'Tx1nGInxGHW0EkS', 'M', 'Oger', 'Meyer', NULL, 'Odit expedita tempora fugiat commodi voluptates. Nemo reprehenderit beatae expedita cupiditate quia facilis error tempore totam. Doloribus assumenda doloremque neque atque excepturi.', 'praesentium accusamus accusantium voluptatum', 'https://large-equipe.org/', '2023-02-13 23:13:25', 'administrator'),
(37, 'Marie10', 'Cedric.Blanchard@yahoo.fr', 'kPNlPiSLUJVxSvh', 'F', 'Arolde', 'Adam', NULL, 'Itaque porro excepturi. Qui laborum illo provident vero corporis harum eum. Illo numquam eveniet.', 'praesentium saepe reprehenderit maiores', 'https://placide-rectorat.info', '2023-07-09 12:48:31', 'user'),
(38, 'Melissandre.Robin68', 'Aquiline.Guillaume@gmail.com', 'gSnDj4pkwEQCvYd', 'F', 'Bénédicte', 'Jean', NULL, 'Asperiores maxime explicabo dolor asperiores nihil amet. Vero exercitationem deserunt ut harum sapiente culpa eveniet. Consectetur maxime dolorem tempore occaecati nemo reprehenderit non quas ex.', 'modi ab similique earum', 'https://intrepide-patientele.net', '2023-01-14 17:28:42', 'administrator'),
(39, 'Henri_Fontaine51', 'Nine.Vasseur@gmail.com', 'YRqic6kF6Vk7Ni8', 'O', 'Victoire', 'Bonnet', NULL, 'Alias deleniti excepturi modi provident. Tempora magnam voluptatibus voluptatibus distinctio perspiciatis veritatis commodi cum. Doloremque cumque officiis illo pariatur repudiandae et.', 'vero provident dolorem cumque', 'https://altruiste-partenaire.name', '2023-04-26 06:45:51', 'administrator'),
(40, 'Aurelle72', 'Berangere44@gmail.com', 'q5g4iHkzeoXkOLp', 'F', 'Magali', 'Perrot', NULL, 'Iure animi fugit distinctio non harum aperiam. Architecto voluptatum dicta illum assumenda. Nesciunt provident quisquam.', 'laudantium magnam maxime voluptate', 'https://pourpre-cadre.org/', '2023-02-18 11:39:19', 'administrator'),
(41, 'Acace83', 'Antonine26@yahoo.fr', 'nGvagWULZzrA1a8', 'O', 'Claudien', 'Martinez', NULL, 'Expedita illo dolore consequatur architecto optio veniam libero accusantium incidunt. Fugiat similique magnam similique qui pariatur. Odio aliquid dolores.', 'iusto quisquam suscipit explicabo', 'https://sauvage-touriste.info', '2023-09-07 14:11:26', 'administrator'),
(42, 'Nadine12', 'Raphaelle36@hotmail.fr', 'dd6OMx43bl7c311', 'M', 'Mahaut', 'Adam', NULL, 'Totam nulla omnis reiciendis esse. Tenetur nesciunt non ullam quas nesciunt odit. Reprehenderit saepe ipsa distinctio mollitia velit aliquid asperiores modi.', 'cupiditate molestias possimus fugit', 'https://egoiste-membre-de-lequipe.name', '2023-03-23 06:21:41', 'user'),
(43, 'Amethyste_Perrot', 'Eugene.Fournier95@hotmail.fr', 'haNpSyjytIcHTBB', 'O', 'Rachel', 'Blanc', NULL, 'Repellat laborum tenetur qui labore labore aut ipsam. Similique repudiandae occaecati ipsum nulla. Earum mollitia aliquam praesentium quaerat.', 'eveniet quibusdam veniam distinctio', 'https://vivace-actionnaire.fr', '2023-05-23 07:42:05', 'administrator'),
(44, 'Athenais81', 'Debora_Marchal13@hotmail.fr', 'zGpMDaNZH9Te140', 'M', 'Tanguy', 'Schneider', NULL, 'Quo voluptates sapiente impedit magnam eveniet. Doloremque impedit officiis dicta rem officiis velit dicta veniam. Veniam ipsa commodi nobis.', 'non at cum error', 'https://egoiste-secouriste.org', '2023-01-17 20:08:39', 'user'),
(45, 'Aube.Marchand', 'Julien.Paris@yahoo.fr', 'hPLVzi3sprRBR0R', 'F', 'Évariste', 'Lacroix', NULL, 'Molestias soluta reiciendis aspernatur eligendi unde aperiam. Similique magnam nostrum cum quidem dolorum atque quod quis. Quas consequuntur atque dolore.', 'optio optio corrupti sint', 'https://egoiste-clientele.net/', '2022-12-29 11:08:44', 'administrator'),
(46, 'Honore44', 'Gontran_Picard87@gmail.com', 'G9MA5FQyQjYdF3d', 'M', 'Gabriel', 'Le gall', NULL, 'Expedita totam quaerat rem est eveniet labore itaque ratione tempore. Alias dolor numquam molestias. Minima repudiandae perspiciatis dignissimos velit aut officia ipsum sunt inventore.', 'earum nesciunt mollitia dolores', 'https://incalculable-conseil-dadministration.fr', '2023-01-27 10:49:03', 'administrator'),
(47, 'Roseline32', 'Camillien.Simon45@gmail.com', '0JwIE3o0rGB_ocx', 'F', 'Cléry', 'Charles', NULL, 'Eius quos libero ut laudantium. Perspiciatis sunt neque sint. Iusto occaecati nesciunt quasi.', 'laboriosam sunt illo enim', 'https://fade-camarade.eu', '2023-04-03 22:05:41', 'user'),
(48, 'Paul.Breton', 'Normand_Deschamps@yahoo.fr', 'NswZpyAYR3fV8wt', 'M', 'Alcyone', 'Brunet', NULL, 'Non reiciendis perspiciatis numquam facere velit dolorum deserunt. Voluptatibus ipsam explicabo alias officiis ex reiciendis veniam cupiditate. Voluptas voluptatem deleniti.', 'tempore esse incidunt quos', 'https://candide-concurrence.info', '2023-08-05 21:55:37', 'administrator'),
(49, 'Severine.Adam', 'Bertrand.Leroy7@gmail.com', 'Fst2wYfxYkcyOqI', 'O', 'Baudouin', 'Lacroix', NULL, 'Dignissimos officia nobis libero. Animi nisi nam blanditiis nulla occaecati voluptatem. Cumque doloremque optio fugit pariatur accusamus inventore eius perspiciatis.', 'non odit quos quam', 'https://minuscule-population-du-quebec.fr/', '2023-07-28 05:47:47', 'user'),
(50, 'Adenet_Fournier', 'Cassandre52@gmail.com', 'Fts4h0GLxEu5Uja', 'F', 'Mahaut', 'Jean', NULL, 'Sit inventore perferendis atque repellat. Veniam soluta quos. Vitae ipsum eos aliquid ad omnis voluptatem veniam placeat itaque.', 'enim aliquid beatae officia', 'https://horrible-equipe.info', '2023-09-22 10:36:56', 'administrator'),
(51, 'Elsa53', 'Sixte.Breton@yahoo.fr', 'Kor3HyJnKpAkBMe', 'O', 'Évelyne', 'Da silva', NULL, 'Soluta ex cumque earum. Ad voluptatem at voluptatem debitis dolores aperiam. Eligendi iste voluptatibus autem adipisci nisi.', 'reiciendis corporis quisquam magnam', 'https://gigantesque-membre-du-personnel.eu/', '2023-04-21 07:57:12', 'user'),
(52, 'Timothee_Bourgeois', 'Agapet_Fontaine@hotmail.fr', '0td4HVtlHfelD_m', 'O', 'Éric', 'Marie', NULL, 'Natus dolor architecto sunt corporis nesciunt enim ducimus totam. Harum sequi amet inventore dolorum laudantium nam ipsum in possimus. Modi quas nisi adipisci odit sapiente illo autem.', 'voluptatem mollitia veritatis dolor', 'https://affable-personnel.com', '2022-11-13 14:51:13', 'administrator');

-- --------------------------------------------------------

--
-- Structure de la table `user_favorite_publications`
--

CREATE TABLE `user_favorite_publications` (
  `id_user` int(11) NOT NULL,
  `id_publication` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_favorite_publications`
--

INSERT INTO `user_favorite_publications` (`id_user`, `id_publication`) VALUES
(12, 1),
(42, 1),
(22, 2),
(26, 2),
(21, 4),
(29, 4),
(31, 5),
(32, 6),
(41, 6),
(35, 8),
(9, 9),
(11, 9),
(22, 9),
(37, 10),
(45, 12),
(17, 14),
(4, 18),
(42, 18),
(10, 20),
(23, 22),
(12, 23),
(23, 24),
(39, 26),
(45, 26),
(1, 27),
(44, 30),
(16, 31),
(10, 33),
(32, 33),
(3, 34),
(16, 34),
(23, 34),
(14, 36),
(49, 37),
(2, 40),
(23, 41),
(29, 41),
(50, 42),
(12, 43),
(40, 44),
(3, 45),
(40, 45),
(43, 45),
(16, 46),
(34, 46),
(50, 46),
(15, 47),
(27, 47),
(43, 47),
(31, 48);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_publication` (`id_publication`),
  ADD KEY `parent_comment` (`parent_comment`);

--
-- Index pour la table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id_publication`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `publication_categories`
--
ALTER TABLE `publication_categories`
  ADD PRIMARY KEY (`id_publication`,`id_category`),
  ADD KEY `id_category` (`id_category`);

--
-- Index pour la table `publication_reputations`
--
ALTER TABLE `publication_reputations`
  ADD PRIMARY KEY (`id_user`,`id_publication`),
  ADD KEY `id_publication` (`id_publication`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `user_favorite_publications`
--
ALTER TABLE `user_favorite_publications`
  ADD PRIMARY KEY (`id_user`,`id_publication`),
  ADD KEY `id_publication` (`id_publication`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT pour la table `publications`
--
ALTER TABLE `publications`
  MODIFY `id_publication` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_publication`) REFERENCES `publications` (`id_publication`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_comment`) REFERENCES `comments` (`id_comment`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `publication_categories`
--
ALTER TABLE `publication_categories`
  ADD CONSTRAINT `publication_categories_ibfk_1` FOREIGN KEY (`id_publication`) REFERENCES `publications` (`id_publication`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_categories_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `publication_reputations`
--
ALTER TABLE `publication_reputations`
  ADD CONSTRAINT `publication_reputations_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publication_reputations_ibfk_2` FOREIGN KEY (`id_publication`) REFERENCES `publications` (`id_publication`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_favorite_publications`
--
ALTER TABLE `user_favorite_publications`
  ADD CONSTRAINT `user_favorite_publications_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_favorite_publications_ibfk_2` FOREIGN KEY (`id_publication`) REFERENCES `publications` (`id_publication`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
