<?php
/**
 * Plugin Name: Monitor Sistema 2026
 * Plugin URI: https://github.com/Espaco-CMaker/Monitor-Sistema-2026
 * Description: Dashboard de monitoramento do sistema em tempo real integrado ao WordPress
 * Version: 1.0.0
 * Author: Espaço CMaker
 * Author URI: https://cmaker.com.br
 * License: MIT
 * Requires PHP: 7.4
 */

// Prevenir acesso direto ao arquivo
if (!defined('ABSPATH')) {
    exit;
}

// Define constantes do plugin
define('MONITOR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('MONITOR_PLUGIN_URL', plugin_dir_url(__FILE__));
define('MONITOR_PLUGIN_VERSION', '1.0.0');

/**
 * Classe principal do plugin
 */
class Monitor_Sistema_2026 {
    
    /**
     * Construtor
     */
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_shortcode('monitor-sistema-2026', array($this, 'render_shortcode'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        add_action('wp_ajax_get_system_info', array($this, 'ajax_get_system_info'));
        add_action('wp_ajax_nopriv_get_system_info', array($this, 'ajax_get_system_info'));
    }
    
    /**
     * Adiciona menu administrativo
     */
    public function add_admin_menu() {
        add_menu_page(
            'Monitor do Sistema',
            'Monitor 2026',
            'manage_options',
            'monitor-sistema-2026',
            array($this, 'render_admin_page'),
            'dashicons-chart-line',
            25
        );
        
        add_submenu_page(
            'monitor-sistema-2026',
            'Configurações',
            'Configurações',
            'manage_options',
            'monitor-sistema-settings',
            array($this, 'render_settings_page')
        );
    }
    
    /**
     * Registra as configurações
     */
    public function register_settings() {
        register_setting('monitor-settings-group', 'monitor_api_url');
        register_setting('monitor-settings-group', 'monitor_api_key');
        register_setting('monitor-settings-group', 'monitor_refresh_interval');
        
        add_settings_section(
            'monitor-settings-section',
            'Configurações do Monitor',
            array($this, 'render_settings_section'),
            'monitor-settings-group'
        );
    }
    
    /**
     * Renderiza a seção de configurações
     */
    public function render_settings_section() {
        echo '<p>Configure a conexão com o servidor Node.js do Monitor Sistema 2026</p>';
    }
    
    /**
     * Renderiza a página de configurações
     */
    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <form method="post" action="options.php">
                <?php settings_fields('monitor-settings-group'); ?>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="monitor_api_url">URL da API Node.js</label>
                        </th>
                        <td>
                            <input 
                                type="url" 
                                id="monitor_api_url" 
                                name="monitor_api_url" 
                                value="<?php echo esc_attr(get_option('monitor_api_url')); ?>"
                                class="regular-text"
                                placeholder="http://localhost:3000"
                            >
                            <p class="description">Exemplo: http://localhost:3000 ou http://seu-ip:3000</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="monitor_refresh_interval">Intervalo de Atualização (segundos)</label>
                        </th>
                        <td>
                            <input 
                                type="number" 
                                id="monitor_refresh_interval" 
                                name="monitor_refresh_interval" 
                                value="<?php echo esc_attr(get_option('monitor_refresh_interval', 2)); ?>"
                                min="1"
                                max="60"
                                class="small-text"
                            >
                            <p class="description">Tempo entre atualizações dos dados</p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button('Salvar Configurações'); ?>
            </form>
            
            <hr>
            
            <h2>Teste da Conexão</h2>
            <button id="test-connection" class="button button-primary">Testar Conexão</button>
            <div id="test-result" style="margin-top: 15px; padding: 10px; border-radius: 5px; display: none;"></div>
        </div>
        
        <script>
            document.getElementById('test-connection').addEventListener('click', function() {
                const apiUrl = document.getElementById('monitor_api_url').value;
                const resultDiv = document.getElementById('test-result');
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = 'Testando...';
                
                fetch(apiUrl + '/api/system-info')
                    .then(response => {
                        if (response.ok) {
                            resultDiv.style.backgroundColor = '#d4edda';
                            resultDiv.style.color = '#155724';
                            resultDiv.innerHTML = '✅ Conexão bem-sucedida! O servidor está respondendo.';
                        } else {
                            throw new Error('Status ' + response.status);
                        }
                    })
                    .catch(error => {
                        resultDiv.style.backgroundColor = '#f8d7da';
                        resultDiv.style.color = '#721c24';
                        resultDiv.innerHTML = '❌ Erro ao conectar: ' + error.message;
                    });
            });
        </script>
        <?php
    }
    
    /**
     * Renderiza a página do admin
     */
    public function render_admin_page() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <div style="max-width: 100%; height: 800px; border: 1px solid #ccc; border-radius: 5px; overflow: hidden;">
                <iframe 
                    id="monitor-frame"
                    src="<?php echo esc_attr(get_option('monitor_api_url', 'http://localhost:3000')); ?>" 
                    style="width: 100%; height: 100%; border: none;"
                    title="Monitor do Sistema">
                </iframe>
            </div>
        </div>
        <?php
    }
    
    /**
     * Renderiza o shortcode [monitor-sistema-2026]
     */
    public function render_shortcode($atts) {
        $atts = shortcode_atts(array(
            'height' => '800',
            'title' => 'Monitor do Sistema',
        ), $atts, 'monitor-sistema-2026');
        
        $api_url = get_option('monitor_api_url', 'http://localhost:3000');
        
        return sprintf(
            '<div class="monitor-container" style="max-width: 100%; height: %spx; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; margin: 20px 0;">
                <iframe 
                    src="%s" 
                    style="width: 100%%; height: 100%%; border: none;"
                    title="%s"
                    allow="autoplay; camera; microphone">
                </iframe>
            </div>',
            esc_attr($atts['height']),
            esc_url($api_url),
            esc_attr($atts['title'])
        );
    }
    
    /**
     * Carrega CSS e JS no frontend
     */
    public function enqueue_frontend_assets() {
        wp_register_style(
            'monitor-frontend-style',
            MONITOR_PLUGIN_URL . 'css/frontend.css',
            array(),
            MONITOR_PLUGIN_VERSION
        );
        wp_register_script(
            'monitor-frontend-script',
            MONITOR_PLUGIN_URL . 'js/frontend.js',
            array('jquery'),
            MONITOR_PLUGIN_VERSION,
            true
        );
    }
    
    /**
     * Carrega CSS e JS no admin
     */
    public function enqueue_admin_assets($hook) {
        if (strpos($hook, 'monitor-sistema') === false) {
            return;
        }
        
        wp_enqueue_style(
            'monitor-admin-style',
            MONITOR_PLUGIN_URL . 'css/admin.css',
            array(),
            MONITOR_PLUGIN_VERSION
        );
    }
    
    /**
     * AJAX para obter informações do sistema
     */
    public function ajax_get_system_info() {
        $api_url = get_option('monitor_api_url', 'http://localhost:3000');
        
        $response = wp_remote_get($api_url . '/api/system-info', array(
            'timeout' => 10,
            'sslverify' => false,
        ));
        
        if (is_wp_error($response)) {
            wp_send_json_error(array(
                'message' => 'Erro ao conectar ao servidor: ' . $response->get_error_message()
            ));
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        wp_send_json_success($data);
    }
}

// Inicializa o plugin
new Monitor_Sistema_2026();

// Hook de ativação
register_activation_hook(__FILE__, function() {
    // Valores padrão
    if (!get_option('monitor_api_url')) {
        add_option('monitor_api_url', 'http://localhost:3000');
    }
    if (!get_option('monitor_refresh_interval')) {
        add_option('monitor_refresh_interval', '2');
    }
});

// Hook de desativação
register_deactivation_hook(__FILE__, function() {
    // Limpeza se necessário
});
